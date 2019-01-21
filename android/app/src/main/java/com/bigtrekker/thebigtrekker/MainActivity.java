package com.bigtrekker.thebigtrekker;

import android.location.Location;
import android.os.Bundle;

import com.bigtrekker.thebigtrekker.services.LocationService;
import com.bigtrekker.thebigtrekker.services.PermissionService;
import com.google.android.material.snackbar.BaseTransientBottomBar;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import android.telephony.SmsManager;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;

import com.google.android.gms.tasks.OnSuccessListener;

public class MainActivity extends AppCompatActivity {
    private String TAG = MainActivity.class.getName();

    private PermissionService mPermissionService;
    private LocationService mLocationService;

    private SmsManager mSmsManager;

    private EditText mMessageInput;

    private EditText mLatitudeInput;
    private EditText mLongitudeInput;
    private void updateLatLong(double latitude, double longitude) {
        mLatitudeInput.setText(String.format("%.4f", latitude));
        mLongitudeInput.setText(String.format("%.4f", longitude));
    }

    private String getSMSContent(String latitude, String longitude, String message) {
        String toSend = "";
        toSend += latitude + "," + longitude;
        toSend += " - sunny";
        toSend += " - eat";
        toSend += " - " + message;
        return toSend;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mPermissionService = new PermissionService(this);
        mLocationService = new LocationService(this, mPermissionService);

        Toolbar toolbar = findViewById(R.id.toolbar);
        toolbar.setLogo(R.drawable.ic_action_name);
        setSupportActionBar(toolbar);

        mMessageInput = findViewById(R.id.message);

        mLatitudeInput = findViewById(R.id.latitude);
        mLongitudeInput = findViewById(R.id.longitude);

        if (!mPermissionService.hasPermissions()) {
            mPermissionService.requestPermissions();
        } else {
            setUpListeners();
        }
    }

    private void setUpListeners() {
        mSmsManager = SmsManager.getDefault();

        FloatingActionButton fabSend = findViewById(R.id.fab);
        fabSend.setOnClickListener(new View.OnClickListener() {
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
                                        mLatitudeInput.getText().toString(),
                                        mLongitudeInput.getText().toString(),
                                        mMessageInput.getText().toString().replaceAll(" - ", " ")
                                    );
                                    Toast.makeText(MainActivity.this, toSend, Toast.LENGTH_LONG).show();
                                    mSmsManager.sendTextMessage("YOUR_PHONE_NUMBER", null, toSend, null, null);
                                }
                            }
                        }).show();
            }
        });
        FloatingActionButton fabRefreshLocation = findViewById(R.id.refresh_location);
        fabRefreshLocation.setOnClickListener(new View.OnClickListener() {
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
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions,
                                           int[] grantResults) {
        if (mPermissionService.hasPermissions()) {
            setUpListeners();
        } else {
            Toast.makeText(this, "This feature requires camera and storage permission",
                    Toast.LENGTH_LONG).show();
        }
    }
}
