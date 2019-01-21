package com.bigtrekker.thebigtrekker.services;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.location.Location;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnSuccessListener;

public class LocationService {

    private Activity activity;
    private PermissionService permissionService;
    private FusedLocationProviderClient mFusedLocationClient;

    public LocationService(Activity activity, PermissionService permissionService) {
        this.activity = activity;
        this.permissionService = permissionService;
        mFusedLocationClient = LocationServices.getFusedLocationProviderClient(activity);
    }

    @SuppressLint("MissingPermission")
    public void getLocation(OnSuccessListener<Location> listener) {
        if(permissionService.hasPermissions()) {
            mFusedLocationClient.getLastLocation()
                    .addOnSuccessListener(activity, listener);
        }
    }
}
