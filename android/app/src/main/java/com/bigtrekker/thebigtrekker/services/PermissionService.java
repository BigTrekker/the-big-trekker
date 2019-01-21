package com.bigtrekker.thebigtrekker.services;

import android.Manifest;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.pm.PackageManager;

import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

public class PermissionService {
    private static final int PERMISSION_CODE = 1;
    private static final String SMS_PERMISSION = Manifest.permission.SEND_SMS;
    private static final String READ_PHONE_STATE_PERMISSION = Manifest.permission.READ_PHONE_STATE;
    private static final String LOCATION_PERMISSION = Manifest.permission.ACCESS_COARSE_LOCATION;

    private Activity activity;
    public PermissionService(Activity activity) {
        this.activity = activity;
    }

    /**
     * Check to see that we have the necessary permissions for this app.
     */
    public boolean hasPermissions() {
        return ContextCompat.checkSelfPermission(activity, SMS_PERMISSION) ==
                PackageManager.PERMISSION_GRANTED
                && ContextCompat.checkSelfPermission(activity, READ_PHONE_STATE_PERMISSION) ==
                PackageManager.PERMISSION_GRANTED
                && ContextCompat.checkSelfPermission(activity, LOCATION_PERMISSION) ==
                PackageManager.PERMISSION_GRANTED;
    }

    public void requestPermissions() {
        if (ActivityCompat.shouldShowRequestPermissionRationale(activity, SMS_PERMISSION)
                || ActivityCompat.shouldShowRequestPermissionRationale(activity, READ_PHONE_STATE_PERMISSION)
                || ActivityCompat.shouldShowRequestPermissionRationale(activity, LOCATION_PERMISSION)) {
            showRequestPermissionRationale();
        } else {
            ActivityCompat.requestPermissions(activity, new String[]{SMS_PERMISSION, READ_PHONE_STATE_PERMISSION, LOCATION_PERMISSION},
                    PERMISSION_CODE);
        }
    }

    /**
     * If the user has declined the permission before, we have to explain that the app needs this
     * permission.
     */
    private void showRequestPermissionRationale() {
        final AlertDialog dialog = new AlertDialog.Builder(activity.getApplicationContext())
                .setMessage("This feature requires sms sending permission")
                .setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        ActivityCompat.requestPermissions(activity,
                                new String[]{SMS_PERMISSION, READ_PHONE_STATE_PERMISSION, LOCATION_PERMISSION}, PERMISSION_CODE);
                    }
                })
                .create();
        dialog.show();
    }
}
