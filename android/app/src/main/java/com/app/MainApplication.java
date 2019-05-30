package com.app;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.airbnb.android.react.maps.MapsPackage;
import com.bugsnag.BugsnagReactNative;
import com.masteratul.exceptionhandler.ReactNativeExceptionHandlerPackage;
import com.tkporter.sendsms.SendSMSPackage;
import com.chirag.RNMail.RNMail;
import com.rnfs.RNFSPackage;
import com.amazonaws.RNAWSCognitoPackage;
import org.wonday.pdf.RCTPdfView;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new MapsPackage(),
            BugsnagReactNative.getPackage(),
            new ReactNativeExceptionHandlerPackage(),
            SendSMSPackage.getInstance(),
            new RNMail(),
            new RNFSPackage(),
            new RNAWSCognitoPackage(),
            new RCTPdfView(),
            new RNFetchBlobPackage(),
            new RNGestureHandlerPackage(),
            new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
