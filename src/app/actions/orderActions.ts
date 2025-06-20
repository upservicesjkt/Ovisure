
'use server';

import type { OrderFormInputValues, OrderRecord } from '@/types/order';
import fs from 'node:fs/promises';
import path from 'node:path';

const ORDERS_PATH = path.join(process.cwd(), 'src', 'data', 'orders.json');
const WHATSAPP_GROUP_ID_FOR_API = 'YOUR_WHATSAPP_GROUP_ID_FROM_API'; // Ganti dengan ID Grup WhatsApp dari API Anda jika menggunakan API
const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN; // Simpan token API Anda di environment variable

async function getOrders(): Promise<OrderRecord[]> {
  try {
    await fs.mkdir(path.dirname(ORDERS_PATH), { recursive: true });
    const data = await fs.readFile(ORDERS_PATH, 'utf-8');
    try {
      const orders = JSON.parse(data);
      // Ensure it's an array and filter out any non-object entries just in case
      return Array.isArray(orders) ? orders.filter(order => typeof order === 'object' && order !== null) : [];
    } catch (parseError) {
      console.error("Failed to parse orders.json:", parseError);
      return []; // Return empty array if parsing fails
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []; // File doesn't exist, return empty array
    }
    console.error("Failed to read orders.json:", error);
    return []; // Return empty array on other read errors
  }
}

async function saveOrdersToFile(orders: OrderRecord[]): Promise<void> {
  try {
    await fs.mkdir(path.dirname(ORDERS_PATH), { recursive: true });
    await fs.writeFile(ORDERS_PATH, JSON.stringify(orders, null, 2), 'utf-8');
  } catch (error) {
    console.error("Failed to save orders.json:", error);
    throw new Error("Gagal menyimpan pesanan ke file.");
  }
}

async function sendWhatsAppNotification(orderData: OrderRecord): Promise<void> {
  const messageBody = `
Pesanan Baru Diterima!
-------------------------
Nama: ${orderData.name}
No. HP: ${orderData.phone}
Alamat: ${orderData.address}
Paket: ${orderData.selectedPackage === "1_box" ? "1 Box" : "2 Box"}
Jumlah: ${orderData.quantity}
Waktu Pesan: ${new Date(orderData.createdAt).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}
-------------------------
Mohon segera diproses.
Grup Target: susu_OvisureGoldOfficial_1234
  `;

  console.log("Attempting to send WhatsApp notification for order:", orderData.name);
  console.log("Message body snippet:", messageBody.substring(0, 200).replace(/\n/g, ' ') + "...");

  if (true) {
    console.log(`[SIMULASI] Pesan WhatsApp akan dikirim ke grup target untuk pesanan ${orderData.name}.`);
    if (!WHATSAPP_API_TOKEN || !WHATSAPP_GROUP_ID_FOR_API || WHATSAPP_GROUP_ID_FOR_API === 'YOUR_WHATSAPP_GROUP_ID_FROM_API') {
        console.warn('Jika menggunakan WhatsApp API: Token API atau Group ID belum dikonfigurasi. Notifikasi aktual via API tidak akan terkirim.');
    }
    return;
  }
  /*
  // Actual API call logic
  */
}

export async function saveOrder(data: OrderFormInputValues): Promise<{ success: boolean; message?: string }> {
  try {
    const quantity = data.selectedPackage === "1_box" ? 1 : 2;

    const processedOrderData: OrderRecord = {
      ...data, // This includes the original name, phone, address, selectedPackage
      name: data.name, // Ensure original name is used
      quantity: quantity,
      createdAt: new Date().toISOString(),
    };

    const currentOrders = await getOrders();
    currentOrders.push(processedOrderData);
    await saveOrdersToFile(currentOrders);

    sendWhatsAppNotification(processedOrderData).catch(error => {
      console.error("Background WhatsApp notification attempt failed:", error);
    });

    return { success: true };
  } catch (error) {
    console.error("Error in saveOrder action:", error);
    return { success: false, message: (error instanceof Error) ? error.message : "Terjadi kesalahan yang tidak diketahui saat menyimpan pesanan." };
  }
}
