package com.bigtrekker.thebigtrekker.services;

import android.app.Activity;
import android.content.SharedPreferences;

public class PreferencesService {
    /**
     * latest number a message has been sent to using the app
     */
    public static final String PREF_TWILIO_NUMBER = "last_twilio_number";

    private SharedPreferences preferences;
    private SharedPreferences.Editor editor;

    public PreferencesService(Activity activity) {
        preferences = activity.getPreferences(Activity.MODE_PRIVATE);
        editor = preferences.edit();
    }

    public String getString(String key) {
        return preferences.getString(key, "");
    }

    public void setString(String key, String value) {
        editor.putString(key, value);
        editor.apply();
    }
}
