import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, PopoverController} from 'ionic-angular';

import { EditRecipePage } from '../edit-recipe/edit-recipe';
import {RecipeService} from '../../services/recipe.service';
import {Recipe} from '../../models/recipe';
import {RecipePage} from '../recipe/recipe';
import {DatabaseOptionsPage} from '../database-options/database-options';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  listRecipes: Recipe[];

  constructor (
    private navCtrl: NavController,
    private recipeService: RecipeService,
    private popoverCtrl: PopoverController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private authService: AuthService) {}

  ionViewWillEnter() {
    this.loadRecipes();
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, {recipe: recipe, index: index});
  }

  private loadRecipes() {
    this.listRecipes = this.recipeService.getRecipes();
  }

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait..'
    });
    const popover = this.popoverCtrl.create(DatabaseOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(
      data => {
        if (!data) {
          return;
        }
        if (data.action == 'load') {
          loading.present();
          this.authService.getActiveUser().getToken()
            .then(
              (token: string) => {
                this.recipeService.fetchList(token)
                  .subscribe(
                    (list: Recipe[]) => {
                      loading.dismiss();
                      if (list) {
                        this.listRecipes = list;
                      } else {
                        this.listRecipes = [];
                      }
                    },
                    error => {
                      loading.dismiss();
                      this.handleError(error.json().error);
                    }
                  );
              }
            );
        } else if (data.action == 'store') {
          loading.present();
          this.authService.getActiveUser().getToken()
            .then(
              (token: string) => {
                this.recipeService.storeList(token)
                  .subscribe(
                    () => loading.dismiss(),
                    error => {
                      loading.dismiss();
                      this.handleError(error.json().error);
                    }
                  );
              }
            );
        }
      }
    );
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

}
