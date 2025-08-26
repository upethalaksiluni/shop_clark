import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';  
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CategoryGridComponent } from './components/category-grid/category-grid.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { AddToCartButtonComponent } from './components/add-to-cart-button/add-to-cart-button.component';
import { ProductFormComponentComponent } from './product-form-component/product-form-component.component';

// Import custom pipes
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';
import { DiscountPricePipe } from './pipes/discount-price.pipe';
import { CategoryFormatPipe } from './pipes/category-format.pipe';
import { StarRatingPipe } from './pipes/star-rating.pipe';
import { StockStatusPipe } from './pipes/stock-status.pipe';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ProductCardComponent,
    CategoryGridComponent,
    HomeComponent,
    ProductsComponent,
    ProductDetailComponent,
    CartComponent,
    CartIconComponent,
    CartItemComponent,
    AddToCartButtonComponent,
    ProductFormComponentComponent,
    // Add custom pipes
    CurrencyFormatPipe,
    DiscountPricePipe,
    CategoryFormatPipe,
    StarRatingPipe,
    StockStatusPipe,
    TruncateTextPipe,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }