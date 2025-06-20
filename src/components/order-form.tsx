
"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import type { OrderFormInputValues } from "@/types/order";
import { OrderFormSchema } from "@/types/order";
import { saveOrder } from "@/app/actions/orderActions";


const OrderForm: React.FC = () => {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { toast } = useToast();
  const form = useForm<OrderFormInputValues>({
    resolver: zodResolver(OrderFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      // selectedPackage: undefined, // Default is fine, user must select
    },
  });

  const onSubmit: SubmitHandler<OrderFormInputValues> = async (data) => {
    form.clearErrors();
    try {
      const result = await saveOrder(data);
      if (result.success) {
        setShowSuccessDialog(true);
      } else {
        toast({
          variant: "destructive",
          title: "Gagal Menyimpan Pesanan",
          description: result.message || "Terjadi kesalahan saat menyimpan pesanan Anda. Silakan coba lagi.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal Menyimpan Pesanan",
        description: "Terjadi kesalahan yang tidak terduga. Silakan coba lagi nanti.",
      });
      console.error("Order submission error:", error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-card p-6 md:p-8 rounded-lg shadow-xl">
          <FormField
            control={form.control}
            name="selectedPackage"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-foreground font-semibold text-lg">Pilih Paket Promo Anda:</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-3"
                  >
                    <FormItem className="flex items-start space-x-3 space-y-0 p-4 border rounded-lg hover:border-primary transition-all cursor-pointer has-[input:checked]:border-primary has-[input:checked]:bg-primary/5">
                      <FormControl>
                        <RadioGroupItem value="1_box" id="1_box" />
                      </FormControl>
                      <FormLabel htmlFor="1_box" className="font-normal cursor-pointer flex-grow space-y-0.5">
                        <strong className="block text-base text-foreground">1 Box Ovisure Gold</strong>
                        <span className="block text-primary font-bold text-lg">Rp 399.000</span>
                        <span className="text-xs text-muted-foreground line-through">Harga Normal: Rp 699.000</span>
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-start space-x-3 space-y-0 p-4 border rounded-lg hover:border-primary transition-all cursor-pointer has-[input:checked]:border-primary has-[input:checked]:bg-primary/5">
                      <FormControl>
                        <RadioGroupItem value="2_boxes" id="2_boxes" />
                      </FormControl>
                      <FormLabel htmlFor="2_boxes" className="font-normal cursor-pointer flex-grow space-y-0.5">
                        <strong className="block text-base text-foreground">2 Box Ovisure Gold (Lebih Hemat!)</strong>
                        <span className="block text-primary font-bold text-lg">Rp 749.000</span>
                        <span className="text-xs text-muted-foreground line-through">Harga Normal: Rp 1.339.000</span>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name" className="text-foreground">Nama Lengkap</FormLabel>
                <FormControl>
                  <Input id="name" placeholder="Masukkan nama lengkap Anda" {...field} className="bg-background"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="phone" className="text-foreground">Nomor HP</FormLabel>
                <FormControl>
                  <Input id="phone" type="tel" placeholder="Contoh: 081234567890" {...field} className="bg-background"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="address" className="text-foreground">Alamat Lengkap</FormLabel>
                <FormControl>
                  <Textarea id="address" placeholder="Masukkan alamat lengkap untuk pengiriman (Nama jalan, nomor rumah, RT/RW, Kelurahan, Kecamatan, Kota/Kab, Provinsi, Kode Pos)" {...field} className="bg-background min-h-[100px]" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center w-full">
            <div className="flex-shrink-0 -mr-7">
              <Image
                src="https://w.ladicdn.com/5f0c07d511b52935c3db88d0/click-20220912091410-20231020085305-xu1ew.gif"
                alt="Click Here"
                width={70} 
                height={70} 
                className="-rotate-90 w-[70px] h-auto"
                unoptimized
                draggable="false"
              />
            </div>
            <Button 
              type="submit" 
              className="flex-grow text-lg py-3" 
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                "Memproses..."
              ) : (
                <>
                  <ShoppingBag className="mr-2 h-5 w-5" /> Pesan Sekarang!
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>

      <Dialog open={showSuccessDialog} onOpenChange={(isOpen) => {
        setShowSuccessDialog(isOpen);
        if (!isOpen) {
          form.reset(); 
        }
      }}>
        <DialogContent className="sm:max-w-lg rounded-lg shadow-xl p-0 overflow-hidden">
          <div className="relative p-6 md:p-8">
            <Image
              src="https://placehold.co/80x80.png"
              alt="Dekorasi Sukses"
              width={70}
              height={70}
              className="absolute top-3 right-3 md:top-4 md:right-4 opacity-60 z-0"
              data-ai-hint="success graphic"
              draggable="false"
            />
            <DialogHeader className="relative z-10 mb-4">
              <DialogTitle className="text-2xl font-bold text-primary text-center">
                Anda berhasil mendaftar
              </DialogTitle>
            </DialogHeader>
            <div className="text-sm md:text-base text-muted-foreground space-y-3 relative z-10 text-center">
              <p>Anda ingat untuk memperhatikan telepon!</p>
              <p>Apoteker akan menelepon kembali untuk mengkonfirmasi pesanan dalam 1-3H berikutnya, harap perhatikan telepon, hindari kontak apoteker yang gagal, Anda tidak mendapatkan saran yang cepat.</p>
            </div>
            <DialogFooter className="mt-8 pt-6 border-t border-border sm:justify-center">
              <DialogClose asChild>
                <Button
                  type="button"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Tutup
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderForm;
