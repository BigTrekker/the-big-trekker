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
        return isGranted(SMS_PERMISSION)
                && isGranted(READ_PHONE_STATE_PERMISSION)
                && isGranted(LOCATION_PERMISSION);
    }

    public void requestPermissions() {
        if (shouldRequestPermission(SMS_PERMISSION)
            || shouldRequestPermission(READ_PHONE_STATE_PERMISSION)
            || shouldRequestPermission(LOCATION_PERMISSION)) {
            showRequestPermissionRationale();
        } else {
            ActivityCompat.requestPermissions(activity, new String[]{
                    SMS_PERMISSION, READ_PHONE_STATE_PERMISSION, LOCATION_PERMISSION
            }, PERMISSION_CODE);
        }
    }

    private boolean isGranted(String permission) {
        return (ContextCompat.checkSelfPermission(activity, permission)
                == PackageManager.PERMISSION_GRANTED);
    }

    private boolean shouldRequestPermission(String permission) {
        return ActivityCompat.shouldShowRequestPermissionRationale(activity, permission);
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
