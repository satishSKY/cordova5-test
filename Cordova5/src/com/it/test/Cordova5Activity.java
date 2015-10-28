package com.it.test;

import org.apache.cordova.*;
import android.os.Bundle;

public class Cordova5Activity extends CordovaActivity {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        loadUrl(launchUrl);
      //  super.loadUrl("file:///android_asset/www/index.html");
    }
}
