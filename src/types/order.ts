
import * as z from "zod";

export const OrderFormSchema = z.object({
  name: z.string().min(2, { message: "Nama lengkap minimal 2 karakter." }),
  phone: z.string().regex(/^[0-9]{9,}$/, { message: "Nomor HP tidak valid." }),
  address: z.string().min(10, { message: "Alamat minimal 10 karakter." }),
  selectedPackage: z.enum(["1_box", "2_boxes"], {
    required_error: "Anda harus memilih salah satu paket promo.",
  }),
});

export type OrderFormInputValues = z.infer<typeof OrderFormSchema>;

// Type for data stored in orders.json and used internally
export interface OrderRecord {
  name: string;
  phone: string;
  address: string;
  selectedPackage: "1_box" | "2_boxes";
  quantity: number;
  createdAt: string; // ISO date string

  // Allow existing data to be partially compatible if some old orders don't have these
  // However, new orders will always have them.
  // For robustness, components reading this should handle potentially missing fields from old data.
}
