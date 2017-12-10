import {AuthService} from '../services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {EditRecipePage} from '../pages/edit-recipe/edit-recipe';
import {RecipePage} from '../pages/recipe/recipe';
import {RecipesPage} from '../pages/recipes/recipes';
import {ShoppingListPage} from '../pages/shopping-list/shopping-list';
import {TabsPage} from '../pages/tabs/tabs';
import {ShoppingListService} from '../services/shopping-list.service';
import {RecipeService} from '../services/recipe.service';
import {SigninPage} from '../pages/signin/signin';
import {SignupPage} from '../pages/signup/signup';
import {DatabaseOptionsPage } from '../pages/database-options/database-options';
import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    EditRecipePage,
    RecipePage,
    RecipesPage,
    ShoppingListPage,
    TabsPage,
    SigninPage,
    SignupPage,
    DatabaseOptionsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ShoppingListPage,
    RecipePage,
    RecipesPage,
    EditRecipePage,
    SigninPage,
    SignupPage,
    DatabaseOptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecipeService,
    AuthService
  ]
})
export class AppModule {}
