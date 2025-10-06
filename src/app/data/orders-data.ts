import { Injectable } from '@angular/core';

export type OrderStatus = 'Creado' | 'En preparación' | 'En tránsito' | 'Entregado' | 'No entregado';

export interface OrderUpdate {
  date: Date;
  status: OrderStatus;
  comment: string;
  updatedBy: string;
}

export interface Order {
  packageNumber: number;
  trackingId: string;
  senderName: string;
  deliveryAddress: string;
  email: string;
  description: string;
  status: OrderStatus;
  updates: OrderUpdate[];
}

@Injectable({
  providedIn: 'root'
})
export class OrdersData {
  private orders: Order[] = [];
  private packageCounter = 1;

  // Crear orden
  createOrder(senderName: string, deliveryAddress: string, email: string, description: string): Order {
    const newOrder: Order = {
      packageNumber: this.packageCounter++,
      trackingId: this.generateTrackingId(),
      senderName,
      deliveryAddress,
      email,
      description,
      status: 'Creado',
      updates: [{
        date: new Date(),
        status: 'Creado',
        comment: 'Orden registrada',
        updatedBy: 'Sistema'
      }]
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  // Actualizar orden
  updateOrder(packageNumber: number, newStatus: OrderStatus, comment: string, updatedBy: string): boolean {
    const order = this.orders.find(o => o.packageNumber === packageNumber);
    if (!order) return false;

    order.status = newStatus;
    order.updates.push({ date: new Date(), status: newStatus, comment, updatedBy });
    return true;
  }

  // Obtener todas las órdenes
  getAllOrders(): Order[] {
    return this.orders;
  }

  // Obtener orden por número de paquete
  getOrderByPackageNumber(packageNumber: number): Order | undefined {
    return this.orders.find(o => o.packageNumber === packageNumber);
  }

  // Obtener estados siguientes válidos
  getNextStatus(currentStatus: OrderStatus): OrderStatus[] {
    switch (currentStatus) {
      case 'Creado': return ['En preparación', 'No entregado'];
      case 'En preparación': return ['En tránsito', 'No entregado'];
      case 'En tránsito': return ['Entregado', 'No entregado'];
      default: return [];
    }
  }

  // Generar Tracking ID aleatorio
  private generateTrackingId(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return Array.from({ length: 12 }, () => letters[Math.floor(Math.random() * letters.length)]).join('');
  }
}
