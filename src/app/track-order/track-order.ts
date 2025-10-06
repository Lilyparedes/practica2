import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersData, Order } from '../data/orders-data';

@Component({
  selector: 'app-track-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './track-order.html',
  styleUrls: ['./track-order.css']
})
export class TrackOrder {
  trackingId: string = '';
  foundOrder?: Order;

  constructor(private ordersData: OrdersData) {}

  searchOrder() {
    const code = this.trackingId.trim();
    if (!code) {
      alert('Ingresa un código válido.');
      return;
    }

    // Buscar la orden
    this.foundOrder = this.ordersData.getAllOrders().find(o => o.trackingId === code);

    const tableBody = document.getElementById('updatesTableBody')!;
    tableBody.innerHTML = ''; // limpiar tabla

    if (!this.foundOrder) {
      alert('No se encontró ninguna orden con ese código.');
      return;
    }

    // Si la orden existe, siempre mostrar al menos la creación
    const updatesToShow = [...this.foundOrder.updates];

    // Construir tabla fila por fila
    updatesToShow.forEach(update => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${new Date(update.date).toLocaleString()}</td>
        <td><span class="badge ${update.status === 'Creado' ? 'bg-secondary' : 'bg-info text-dark'}">${update.status}</span></td>
        <td>${update.comment}</td>
        <td>${update.updatedBy}</td>
      `;
      tableBody.appendChild(row);
    });
  }
}
