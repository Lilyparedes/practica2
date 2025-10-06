import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersData, Order, OrderStatus } from '../data/orders-data';

@Component({
  selector: 'app-update-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-order.html',
  styleUrls: ['./update-order.css']
})
export class UpdateOrder {
  packageNumber: number = 0;  
  foundOrder?: Order;

  newStatus: OrderStatus = 'Creado';
  comment: string = '';
  updatedBy: string = '';

  // Control para deshabilitar campos si la orden está finalizada
  isFinalized: boolean = false;

  constructor(public ordersData: OrdersData) {}

  searchOrder() {
    if (!this.packageNumber || this.packageNumber <= 0) {
      alert('Ingresa un número de paquete válido.');
      return;
    }

    this.foundOrder = this.ordersData.getOrderByPackageNumber(this.packageNumber);

    if (!this.foundOrder) {
      alert('No se encontró ninguna orden con ese número.');
      this.resetForm();
      return;
    }

    // Determinar si la orden ya fue entregada o no entregada
    this.isFinalized = this.foundOrder.status === 'Entregado' || this.foundOrder.status === 'No entregado';

    const nextStatuses = this.ordersData.getNextStatus(this.foundOrder.status);
    this.newStatus = nextStatuses[0] || this.foundOrder.status;
    this.comment = '';
    this.updatedBy = '';
  }

  updateOrder() {
    if (!this.foundOrder) {
      alert('Primero busca una orden antes de actualizar.');
      return;
    }

    if (this.isFinalized) {
      alert('Esta orden ya está finalizada y no se puede actualizar.');
      return;
    }

    const nextStatuses = this.ordersData.getNextStatus(this.foundOrder.status);
    if (!nextStatuses.includes(this.newStatus)) {
      alert(`Estado inválido. Opciones permitidas: ${nextStatuses.join(', ')}`);
      return;
    }

    const trimmedComment = this.comment.trim();
    if (trimmedComment.length < 20 || trimmedComment.length > 40) {
      alert('El comentario debe tener entre 20 y 40 caracteres.');
      return;
    }

    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;
    if (!nameRegex.test(this.updatedBy)) {
      alert('El nombre del responsable no puede contener números o símbolos.');
      return;
    }

    const success = this.ordersData.updateOrder(
      this.packageNumber,
      this.newStatus,
      trimmedComment,
      this.updatedBy
    );

    if (success) {
      alert('Orden actualizada correctamente.');
    } else {
      alert('No se pudo actualizar la orden. Revisa la secuencia de estados.');
    }

    this.resetForm();
  }

  private resetForm() {
    this.foundOrder = undefined;
    this.packageNumber = 0;
    this.comment = '';
    this.updatedBy = '';
    this.newStatus = 'Creado';
    this.isFinalized = false;
  }
}
