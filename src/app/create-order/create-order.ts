import { Component } from '@angular/core';
import { OrdersData, Order } from '../data/orders-data';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.html',
  imports: [FormsModule],
  styleUrls: ['./create-order.css']
  
})
export class CreateOrder {
  senderName = '';
  deliveryAddress = '';
  email = '';
  description = '';

  constructor(private ordersData: OrdersData) {}

  createOrder() {
    if (!this.validateInputs()) return;

    const order: Order = this.ordersData.createOrder(
      this.senderName,
      this.deliveryAddress,
      this.email,
      this.description
    );

    alert(`Orden creada!\nNúmero de paquete: ${order.packageNumber}\nCódigo: ${order.trackingId}`);
    console.log('Órdenes actuales en memoria:', this.ordersData.getAllOrders());

    this.senderName = '';
    this.deliveryAddress = '';
    this.email = '';
    this.description = '';
  }

  private validateInputs(): boolean {
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;
    if (!nameRegex.test(this.senderName)) {
      alert('El nombre no puede estar vacío ni contener números/símbolos.');
      return false;
    }
    if (!this.deliveryAddress.trim()) {
      alert('La dirección no puede estar vacía.');
      return false;
    }
    const emailRegex = /^\w+([.-]?\w+)*@(gmail|outlook)\.com$/i;
    if (!emailRegex.test(this.email)) {
      alert('Correo inválido. Solo Gmail o Outlook.');
      return false;
    }
    if (this.description.trim().length < 40 || this.description.trim().length > 120) {
      alert('La descripción debe tener entre 40 y 120 caracteres.');
      return false;
    }
    return true;
  }
}
