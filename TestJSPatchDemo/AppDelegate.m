//
//  AppDelegate.m
//  TestJSPatchDemo
//
//  Created by 宋志明 on 15/11/25.
//  Copyright © 2015年 宋志明. All rights reserved.
//

#import "AppDelegate.h"
#import "JPEngine.h"
#import "HomeViewController.h"
@interface AppDelegate ()

@end

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    [JPEngine startEngine];
    
    // exec js directly
//    [JPEngine evaluateScript:@"\
//     var alertView = require('UIAlertView').alloc().init();\
//     alertView.setTitle('Alert');\
//     alertView.setMessage('AlertView from js'); \
//     alertView.addButtonWithTitle('OK');\
//     alertView.show(); \
//     "];
    
    // exec js directly
//    [JPEngine evaluateScript:@"\
//     var alertView = require('UIAlertView').alloc().init();\
//     alertView.setTitle('Alert');\
//     alertView.setMessage('AlertView from js'); \
//     alertView.addButtonWithTitle('OK');\
//     alertView.show(); \
//     "];
    
    NSURLRequest *request = [[NSURLRequest alloc]initWithURL:[NSURL URLWithString:@"https://raw.githubusercontent.com/songzhiming/TestJSPatchDemo/master/TestJSPatchDemo/JSPatch/fingerprint.js"] cachePolicy:NSURLRequestReloadIgnoringLocalCacheData timeoutInterval:20.0];
    
    // exec js file from network
//    [NSURLConnection sendAsynchronousRequest:request queue:[NSOperationQueue mainQueue] completionHandler:^(NSURLResponse *response, NSData *data, NSError *connectionError) {
//        NSString *script = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
//        NSLog(@"script===%@",script);
//        [JPEngine evaluateScript:script];
//
//    }];
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    HomeViewController *vc = [[HomeViewController alloc]init];
    self.window.rootViewController = vc;
    //    view.backgroundColor = [UIColor redColor];
    [self.window makeKeyAndVisible];
    
    // exec local js file
    NSString *sourcePath = [[NSBundle mainBundle] pathForResource:@"fingerprint" ofType:@"js"];
    NSString *script = [NSString stringWithContentsOfFile:sourcePath encoding:NSUTF8StringEncoding error:nil];
    [JPEngine evaluateScript:script];
    
//    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
//    HomeViewController *vc = [[HomeViewController alloc]init];
//    self.window.rootViewController = vc;
//    UIView *view = [self genView];
//    //    view.backgroundColor = [UIColor redColor];
//    [vc.view addSubview:view];
//    [self.window makeKeyAndVisible];


    
    return YES;
}

- (UIView *)genView
{
    return [[UIView alloc] initWithFrame:CGRectMake(0, 0, 320, 320)];
}


- (void)applicationWillResignActive:(UIApplication *)application {
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}

- (void)applicationWillTerminate:(UIApplication *)application {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}

@end
