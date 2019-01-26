package com.bigtrekker.thebigtrekker;

import android.content.Intent;
import android.database.Cursor;
import android.location.Location;
import android.net.Uri;
import android.os.Bundle;

import com.bigtrekker.thebigtrekker.services.LocationService;
import com.bigtrekker.thebigtrekker.services.PermissionService;
import com.bigtrekker.thebigtrekker.services.PreferencesService;
import com.google.android.material.snackbar.BaseTransientBottomBar;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.provider.ContactsContract;
import android.telephony.SmsManager;
import android.text.Html;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnSuccessListener;

public class MainActivity extends AppCompatActivity {
    private String TAG = MainActivity.class.getName();
    private static final int RESULT_PICK_CONTACT = 1;

    private PermissionService mPermissionService;
    private LocationService mLocationService;
    private PreferencesService mPreferencesService;

    private SmsManager mSmsManager;

    private EditText phoneNumberInput;
    private EditText messageInput;

    private EditText latitudeInput;
    private EditText longitudeInput;
    private void updateLatLong(double latitude, double longitude) {
        latitudeInput.setText(String.format("%.4f", latitude));
        longitudeInput.setText(String.format("%.4f", longitude));
    }

    private TextView smsContent;

    private FloatingActionButton pickContactButton;
    private FloatingActionButton refreshLocationButton;
    private FloatingActionButton refreshSmsContent;
    private FloatingActionButton sendButton;

    private String getSMSContent(String latitude, String longitude, String message) {
        String toSend = "";
        toSend += latitude + "," + longitude;
        toSend += " - sunny"; // TODO: remove when sms handler has been changed
        toSend += " - eat"; // TODO: remove when sms handler has been changed
        toSend += " - " + message.replaceAll(" - ", " ");
        return toSend;
    }

    private void updateSmsContent() {
        String content = getSMSContent(
                latitudeInput.getText().toString(),
                longitudeInput.getText().toString(),
                messageInput.getText().toString()
        );

        smsContent.setText(Html.fromHtml(
                "<p>To: <b>" + phoneNumberInput.getText() + "</b></p>" +
                "<p>Message:<br/>\"<b>" + content + "</b>\"</p>"
        ));
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mPermissionService = new PermissionService(this);
        mLocationService = new LocationService(this, mPermissionService);
        mPreferencesService = new PreferencesService(this);

        Toolbar toolbar = findViewById(R.id.toolbar);
        toolbar.setLogo(R.drawable.ic_action_name);
        setSupportActionBar(toolbar);

        phoneNumberInput =      findViewById(R.id.phone_number);
        phoneNumberInput.setText(mPreferencesService.getString(PreferencesService.PREF_TWILIO_NUMBER));
        messageInput =          findViewById(R.id.message);
        latitudeInput =         findViewById(R.id.latitude);
        longitudeInput =        findViewById(R.id.longitude);

        smsContent =            findViewById(R.id.sms_content);

        pickContactButton =     findViewById(R.id.pick_contact);
        refreshLocationButton = findViewById(R.id.refresh_location);
        refreshSmsContent =     findViewById(R.id.refresh_sms_content);
        sendButton =            findViewById(R.id.fab);

        if (!mPermissionService.hasPermissions()) {
            mPermissionService.requestPermissions();
        } else {
            setUpListeners();
        }
    }

    private void setUpListeners() {
        mSmsManager = SmsManager.getDefault();

        pickContactButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent contactPickerIntent = new Intent(
                    Intent.ACTION_PICK,
                    ContactsContract.CommonDataKinds.Phone.CONTENT_URI
                );
                startActivityForResult(contactPickerIntent, RESULT_PICK_CONTACT);
            }
        });

        sendButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Message sent", Snackbar.LENGTH_LONG)
                .setAction("UNDO", new View.OnClickListener() {
                    @Override
                    public void onClick(View view) { /* DO NOTHING */ }
                })
                .addCallback(new BaseTransientBottomBar.BaseCallback<Snackbar>() {
                    @Override
                    public void onDismissed(Snackbar transientBottomBar, int event) {
                        super.onDismissed(transientBottomBar, event);

                        if (event == Snackbar.Callback.DISMISS_EVENT_TIMEOUT) {
                            String toSend = getSMSContent(
                                latitudeInput.getText().toString(),
                                longitudeInput.getText().toString(),
                                messageInput.getText().toString()
                            );

                            Toast.makeText(MainActivity.this, toSend, Toast.LENGTH_LONG).show();

                            mSmsManager.sendTextMessage(
                                phoneNumberInput.getText().toString(),
                                null, toSend, null, null
                            );

                            mPreferencesService.setString(
                                PreferencesService.PREF_TWILIO_NUMBER,
                                phoneNumberInput.getText().toString()
                            );
                        }
                    }
                }).show();
            }
        });
        refreshLocationButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mLocationService.getLocation(new OnSuccessListener<Location>() {
                    @Override
                    public void onSuccess(Location location) {
                        Toast.makeText(MainActivity.this, "Location retrieved successfully", Toast.LENGTH_LONG).show();
                        // Got last known location. In some rare situations this can be null.
                        if (location != null) {
                            updateLatLong(location.getLatitude(), location.getLongitude());
                        }
                    }

                });
            }
        });
        refreshSmsContent.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                updateSmsContent();
            }
        });
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        // check whether the result is ok
        if (resultCode == RESULT_OK) {
            // Check for the request code, we might be using multiple startActivityForResult
            switch (requestCode) {
                case RESULT_PICK_CONTACT: // a contact was picked
                    Uri contactData = data.getData();
                    Cursor c = getContentResolver().query(contactData, null, null, null, null);
                    try {
                        if (c.moveToFirst()) {
                            int phoneIndex = c.getColumnIndex(ContactsContract.CommonDataKinds.Phone.NUMBER);
                            String num = c.getString(phoneIndex);
                            phoneNumberInput.setText(num);
                        }
                    } catch (NullPointerException e) { /* ignore */ }
                    c.close();
                    break;
            }
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions,  int[] grantResults) {
        if (mPermissionService.hasPermissions()) {
            setUpListeners();
        } else {
            Toast.makeText(
                this,
                "This feature requires sms and phone and location permissions",
                Toast.LENGTH_LONG
            ).show();
        }
    }
}
