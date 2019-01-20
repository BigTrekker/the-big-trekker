package com.bigtrekker.thebigtrekker;

import android.Manifest;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.pm.PackageManager;
import android.graphics.drawable.Drawable;
import android.location.Location;
import android.os.Bundle;
import android.support.design.widget.BaseTransientBottomBar;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.telephony.SmsManager;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.Toast;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnSuccessListener;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {
    private String TAG = MainActivity.class.getName();

    private static final int PERMISSION_CODE = 1;
    private static final String SMS_PERMISSION = Manifest.permission.SEND_SMS;
    private static final String READ_PHONE_STATE_PERMISSION = Manifest.permission.READ_PHONE_STATE;
    private static final String LOCATION_PERMISSION = Manifest.permission.ACCESS_COARSE_LOCATION;

    private SmsManager mSmsManager;
    private FusedLocationProviderClient mFusedLocationClient;

    private EditText mMessageInput;
    private double mLatitude;
    private double mLongitude;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        toolbar.setLogo(R.drawable.ic_action_name);
        setSupportActionBar(toolbar);

        mMessageInput = (EditText) findViewById(R.id.message);

        if (!hasPermissions()) {
            requestPermissions();
        } else {
            setUpListeners();
        }
    }

    private void setUpListeners() {
        if (ContextCompat.checkSelfPermission(this, READ_PHONE_STATE_PERMISSION) ==
                PackageManager.PERMISSION_GRANTED) {
            mFusedLocationClient = LocationServices.getFusedLocationProviderClient(this);
            mFusedLocationClient.getLastLocation()
            .addOnSuccessListener(this, new OnSuccessListener<Location>() {
                @Override
                public void onSuccess(Location location) {
                    // Got last known location. In some rare situations this can be null.
                    if (location != null) {
                        mLatitude = location.getLatitude();
                        mLongitude = location.getLongitude();
                    }
                }
            });
        }

        mSmsManager = SmsManager.getDefault();

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Message sent", Snackbar.LENGTH_LONG)
                        .setAction("UNDO", new View.OnClickListener() {
                            @Override
                            public void onClick(View view) {
                                // DO NOTHING
                            }
                        })
                        .addCallback(new BaseTransientBottomBar.BaseCallback<Snackbar>() {
                            @Override
                            public void onDismissed(Snackbar transientBottomBar, int event) {
                                super.onDismissed(transientBottomBar, event);

                                if (event == Snackbar.Callback.DISMISS_EVENT_TIMEOUT) {
                                    String toSend = "";
                                    toSend += mLatitude + "," + mLongitude;
                                    toSend += " - sunny";
                                    toSend += " - eat";
                                    toSend += " - " + mMessageInput.getText().toString().replaceAll(" - ", " ");
                                    Toast.makeText(MainActivity.this, toSend, Toast.LENGTH_LONG).show();
                                    mSmsManager.sendTextMessage("YOUR_PHONE_NUMBER", null, toSend, null, null);
                                }
                            }
                        }).show();
            }
        });
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions,
                                           int[] grantResults) {
        if (hasPermissions()) {
            setUpListeners();
        } else {
            Toast.makeText(this, "This feature requires camera and storage permission",
                    Toast.LENGTH_LONG).show();
        }
    }

    /**
     * Check to see that we have the necessary permissions for this app.
     */
    private boolean hasPermissions() {
        return ContextCompat.checkSelfPermission(this, SMS_PERMISSION) ==
                PackageManager.PERMISSION_GRANTED
                && ContextCompat.checkSelfPermission(this, READ_PHONE_STATE_PERMISSION) ==
                PackageManager.PERMISSION_GRANTED
                && ContextCompat.checkSelfPermission(this, LOCATION_PERMISSION) ==
                PackageManager.PERMISSION_GRANTED;
    }

    private void requestPermissions() {
        if (ActivityCompat.shouldShowRequestPermissionRationale(this, SMS_PERMISSION)
                || ActivityCompat.shouldShowRequestPermissionRationale(this, READ_PHONE_STATE_PERMISSION)
                || ActivityCompat.shouldShowRequestPermissionRationale(this, LOCATION_PERMISSION)) {
            showRequestPermissionRationale();
        } else {
            ActivityCompat.requestPermissions(this, new String[]{SMS_PERMISSION, READ_PHONE_STATE_PERMISSION, LOCATION_PERMISSION},
                    PERMISSION_CODE);
        }
    }

    /**
     * If the user has declined the permission before, we have to explain that the app needs this
     * permission.
     */
    private void showRequestPermissionRationale() {
        final AlertDialog dialog = new AlertDialog.Builder(getApplicationContext())
                .setMessage("This feature requires sms sending permission")
                .setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        ActivityCompat.requestPermissions(MainActivity.this,
                                new String[]{SMS_PERMISSION, READ_PHONE_STATE_PERMISSION, LOCATION_PERMISSION}, PERMISSION_CODE);
                    }
                })
                .create();
        dialog.show();
    }
}
