
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import fs from 'node:fs/promises';
import path from 'node:path';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LogOut, PlusCircle, Trash2, Edit3, Save, Settings } from 'lucide-react';
import type { Testimonial } from '@/types/testimonial';
import type { PageContent, HeroContent, CtaImproveHealthSectionContent } from '@/types/pageContent';

const TESTIMONIALS_PATH = path.join(process.cwd(), 'src', 'data', 'testimonials.json');
const PAGE_CONTENT_PATH = path.join(process.cwd(), 'src', 'data', 'pageContent.json');
const ADMIN_COOKIE_NAME = 'admin-auth';

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    await fs.mkdir(path.dirname(TESTIMONIALS_PATH), { recursive: true });
    const data = await fs.readFile(TESTIMONIALS_PATH, 'utf-8');
    try {
      const testimonials = JSON.parse(data);
      return Array.isArray(testimonials) ? testimonials : [];
    } catch (parseError) {
      console.error("Failed to parse testimonials.json:", parseError);
      try {
        await fs.writeFile(TESTIMONIALS_PATH, '[]', 'utf-8');
        console.log("Recovered by creating an empty testimonials.json");
      } catch (writeError) {
        console.error("Failed to write recovery testimonials.json:", writeError);
      }
      return [];
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      try {
        await fs.writeFile(TESTIMONIALS_PATH, '[]', 'utf-8');
        console.log("Initialized testimonials.json with an empty array.");
        return [];
      } catch (initError) {
         console.error("Failed to initialize testimonials.json:", initError);
        return []; 
      }
    }
    console.error("Failed to read testimonials.json:", error);
    return []; 
  }
}

async function saveTestimonials(testimonials: Testimonial[]): Promise<void> {
  try {
    await fs.mkdir(path.dirname(TESTIMONIALS_PATH), { recursive: true });
    const dataToSave = Array.isArray(testimonials) ? testimonials : [];
    await fs.writeFile(TESTIMONIALS_PATH, JSON.stringify(dataToSave, null, 2), 'utf-8');
    revalidatePath('/'); 
    revalidatePath('/admin/dashboard');
  } catch (error) {
    console.error("Failed to save testimonials:", error);
  }
}

async function getPageContent(): Promise<PageContent> {
  const defaultContent: PageContent = {
    heroSection: {
      kicker: "Ovisure Gold Indonesia",
      headlineMain: "SUSU TERBAIK UNTUK ",
      headlineEmphasis: "SENDI & LUTUT",
      paragraphBeforeBold: "Tulang dan sendi yang sehat. Kembali ke kehidupan normal ",
      paragraphBoldText: "hanya dalam 3-4 minggu.",
      paragraphAfterBold: ".",
      imageSrc: "https://w.ladicdn.com/s750x750/6635dc99ef5f4900127bad81/anh-vip-copy-20250106044731-qmuvl.jpg",
      dataAiHint: "milk product health"
    },
    ctaImproveHealthSection: {
      imageSrc: "https://placehold.co/500x350.png",
      dataAiHint: "healthy activity lifestyle"
    }
  };
  try {
    await fs.mkdir(path.dirname(PAGE_CONTENT_PATH), { recursive: true });
    const data = await fs.readFile(PAGE_CONTENT_PATH, 'utf-8');
    try {
      const parsedData = JSON.parse(data) as PageContent;
      return {
        heroSection: parsedData.heroSection || defaultContent.heroSection,
        ctaImproveHealthSection: parsedData.ctaImproveHealthSection || defaultContent.ctaImproveHealthSection,
      };
    } catch (parseError) {
      console.error("Failed to parse pageContent.json:", parseError);
      await fs.writeFile(PAGE_CONTENT_PATH, JSON.stringify(defaultContent, null, 2), 'utf-8');
      console.log("Recovered by writing default pageContent.json");
      return defaultContent;
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
       try {
        await fs.writeFile(PAGE_CONTENT_PATH, JSON.stringify(defaultContent, null, 2), 'utf-8');
        console.log("Initialized pageContent.json with default content.");
        return defaultContent;
      } catch (initError) {
         console.error("Failed to initialize pageContent.json:", initError);
        return defaultContent; 
      }
    }
    console.error("Failed to read pageContent.json:", error);
    return defaultContent; 
  }
}

async function savePageContent(content: PageContent): Promise<void> {
  try {
    await fs.mkdir(path.dirname(PAGE_CONTENT_PATH), { recursive: true });
    await fs.writeFile(PAGE_CONTENT_PATH, JSON.stringify(content, null, 2), 'utf-8');
    revalidatePath('/');
    revalidatePath('/admin/dashboard');
  } catch (error) {
    console.error("Failed to save pageContent.json:", error);
  }
}


export default async function AdminDashboardPage({ searchParams }: { searchParams?: { editVideoId?: string, error?: string, content_success?: string, testimonial_success?: string } }) {
  const testimonials = await getTestimonials();
  const pageContent = await getPageContent();
  const editingVideoId = searchParams?.editVideoId;
  let testimonialToEdit: Testimonial | undefined = undefined;

  if (editingVideoId) {
    testimonialToEdit = testimonials.find(t => t.videoId === editingVideoId);
  }

  async function handleLogout() {
    'use server';
    cookies().delete(ADMIN_COOKIE_NAME);
    redirect('/admin/login');
  }

  async function saveTestimonialAction(formData: FormData) {
    'use server';
    const originalVideoId = formData.get('originalVideoId') as string | null;

    const testimonialData: Testimonial = {
      name: formData.get('name') as string,
      age: formData.get('age') as string || "", 
      quote: formData.get('quote') as string,
      videoId: formData.get('videoId') as string,
      imageSrc: formData.get('imageSrc') as string || 'https://placehold.co/100x100.png',
      dataAiHint: formData.get('dataAiHint') as string || 'person testimonial',
    };

    if (!testimonialData.name || !testimonialData.quote || !testimonialData.videoId) {
      redirect('/admin/dashboard?error=Nama, Kutipan, dan ID Video wajib diisi');
      return;
    }
    
    let currentTestimonials = await getTestimonials();

    if (originalVideoId) { 
      const index = currentTestimonials.findIndex(t => t.videoId === originalVideoId);
      if (index !== -1) {
        if (testimonialData.videoId !== originalVideoId && currentTestimonials.some((t, i) => i !== index && t.videoId === testimonialData.videoId)) {
            redirect(`/admin/dashboard?error=ID Video ${testimonialData.videoId} sudah ada untuk testimoni lain.&editVideoId=${originalVideoId}`);
            return;
        }
        currentTestimonials[index] = testimonialData;
      } else {
        redirect(`/admin/dashboard?error=Testimoni dengan ID video original ${originalVideoId} tidak ditemukan untuk diedit.`);
        return;
      }
    } else { 
        if (currentTestimonials.some(t => t.videoId === testimonialData.videoId)) {
            redirect('/admin/dashboard?error=Testimoni dengan ID Video ini sudah ada.');
            return;
        }
        currentTestimonials.push(testimonialData);
    }
    await saveTestimonials(currentTestimonials);
    redirect('/admin/dashboard?testimonial_success=Testimoni berhasil disimpan!'); 
  }
  
  async function deleteTestimonial(formData: FormData) {
    'use server';
    const videoIdToDelete = formData.get('videoId') as string;
    const currentTestimonials = await getTestimonials();
    const updatedTestimonials = currentTestimonials.filter(t => t.videoId !== videoIdToDelete);
    await saveTestimonials(updatedTestimonials);
    redirect('/admin/dashboard?testimonial_success=Testimoni berhasil dihapus.');
  }

  async function savePageContentAction(formData: FormData) {
    'use server';
    const currentContent = await getPageContent();
    
    const heroData: HeroContent = {
      kicker: formData.get('heroKicker') as string,
      headlineMain: formData.get('heroHeadlineMain') as string,
      headlineEmphasis: formData.get('heroHeadlineEmphasis') as string,
      paragraphBeforeBold: formData.get('heroParagraphBeforeBold') as string,
      paragraphBoldText: formData.get('heroParagraphBoldText') as string,
      paragraphAfterBold: formData.get('heroParagraphAfterBold') as string || '', 
      imageSrc: formData.get('heroImageSrc') as string,
      dataAiHint: formData.get('heroDataAiHint') as string || 'product image', 
    };

    if (!heroData.kicker || !heroData.headlineMain || !heroData.headlineEmphasis || !heroData.paragraphBeforeBold || !heroData.paragraphBoldText || !heroData.imageSrc) {
      redirect('/admin/dashboard?error=Semua field untuk Konten Hero wajib diisi (kecuali Paragraf Setelah Teks Tebal).');
      return;
    }
    
    const ctaImproveHealthData: CtaImproveHealthSectionContent = {
        imageSrc: formData.get('ctaImageSrc') as string,
        dataAiHint: formData.get('ctaDataAiHint') as string || 'activity image', 
    };

    if (!ctaImproveHealthData.imageSrc) {
        redirect('/admin/dashboard?error=URL Gambar untuk bagian CTA Tingkatkan Kesehatan wajib diisi.');
        return;
    }

    const updatedContent: PageContent = {
      ...currentContent, 
      heroSection: heroData,
      ctaImproveHealthSection: ctaImproveHealthData,
    };

    await savePageContent(updatedContent);
    redirect('/admin/dashboard?content_success=Konten Halaman berhasil disimpan!');
  }

  return (
    <div className="min-h-screen bg-muted p-4 md:p-8">
      <header className="container mx-auto mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
        <form action={handleLogout}>
          <Button variant="outline" type="submit">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </form>
      </header>

      {searchParams?.error && (
        <div className="container mx-auto mb-4">
            <Card className="bg-destructive/10 border-destructive">
                <CardContent className="p-4">
                    <p className="text-destructive font-semibold">{searchParams.error}</p>
                </CardContent>
            </Card>
        </div>
      )}
      {searchParams?.testimonial_success && (
        <div className="container mx-auto mb-4">
            <Card className="bg-green-500/10 border-green-500">
                <CardContent className="p-4">
                    <p className="text-green-700 font-semibold">{searchParams.testimonial_success}</p>
                </CardContent>
            </Card>
        </div>
      )}
      {searchParams?.content_success && (
        <div className="container mx-auto mb-4">
            <Card className="bg-green-500/10 border-green-500">
                <CardContent className="p-4">
                    <p className="text-green-700 font-semibold">{searchParams.content_success}</p>
                </CardContent>
            </Card>
        </div>
      )}

      <main className="container mx-auto space-y-8">

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Settings className="mr-2 h-6 w-6 text-primary" />
              Kelola Konten Halaman Utama
            </CardTitle>
            <CardDescription>
              Ubah teks dan gambar untuk berbagai bagian di halaman utama.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={savePageContentAction} className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold border-b pb-2 mb-4">Bagian Hero</h3>
                <div className="space-y-3">
                    <div>
                        <Label htmlFor="heroKicker">Kicker (Teks kecil di atas judul utama)</Label>
                        <Input id="heroKicker" name="heroKicker" defaultValue={pageContent.heroSection?.kicker || ''} required />
                    </div>
                    <div>
                        <Label htmlFor="heroHeadlineMain">Judul Utama (Bagian Biasa)</Label>
                        <Input id="heroHeadlineMain" name="heroHeadlineMain" defaultValue={pageContent.heroSection?.headlineMain || ''} required />
                    </div>
                    <div>
                        <Label htmlFor="heroHeadlineEmphasis">Judul Utama (Bagian Ditebalkan/Berwarna)</Label>
                        <Input id="heroHeadlineEmphasis" name="heroHeadlineEmphasis" defaultValue={pageContent.heroSection?.headlineEmphasis || ''} required />
                    </div>
                    <div>
                        <Label htmlFor="heroParagraphBeforeBold">Paragraf (Sebelum Teks Tebal)</Label>
                        <Textarea id="heroParagraphBeforeBold" name="heroParagraphBeforeBold" defaultValue={pageContent.heroSection?.paragraphBeforeBold || ''} required />
                    </div>
                    <div>
                        <Label htmlFor="heroParagraphBoldText">Paragraf (Teks Tebal)</Label>
                        <Input id="heroParagraphBoldText" name="heroParagraphBoldText" defaultValue={pageContent.heroSection?.paragraphBoldText || ''} required />
                    </div>
                    <div>
                        <Label htmlFor="heroParagraphAfterBold">Paragraf (Setelah Teks Tebal) - Opsional</Label>
                        <Textarea id="heroParagraphAfterBold" name="heroParagraphAfterBold" defaultValue={pageContent.heroSection?.paragraphAfterBold || ''} />
                    </div>
                    <div>
                        <Label htmlFor="heroImageSrc">URL Gambar Hero</Label>
                        <Input id="heroImageSrc" name="heroImageSrc" type="url" placeholder="https://urlgambar.com/hero.png" defaultValue={pageContent.heroSection?.imageSrc || ''} required />
                    </div>
                    <div>
                        <Label htmlFor="heroDataAiHint">Petunjuk AI untuk Gambar Hero</Label>
                        <Input id="heroDataAiHint" name="heroDataAiHint" placeholder="Contoh: milk product health" defaultValue={pageContent.heroSection?.dataAiHint || ''} />
                    </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t">
                <h3 className="text-xl font-semibold border-b pb-2 mb-4">Bagian CTA Tingkatkan Kesehatan</h3>
                <div className="space-y-3">
                    <div>
                        <Label htmlFor="ctaImageSrc">URL Gambar</Label>
                        <Input id="ctaImageSrc" name="ctaImageSrc" type="url" placeholder="https://urlgambar.com/cta.png" defaultValue={pageContent.ctaImproveHealthSection?.imageSrc || ''} required />
                    </div>
                    <div>
                        <Label htmlFor="ctaDataAiHint">Petunjuk AI untuk Gambar</Label>
                        <Input id="ctaDataAiHint" name="ctaDataAiHint" placeholder="Contoh: healthy lifestyle" defaultValue={pageContent.ctaImproveHealthSection?.dataAiHint || ''} />
                    </div>
                </div>
              </div>

              <Button type="submit" className="bg-primary hover:bg-primary/90 mt-6">
                <Save className="mr-2 h-4 w-4" /> Simpan Semua Konten Halaman
              </Button>
            </form>
          </CardContent>
        </Card>


        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              {testimonialToEdit ? <Save className="mr-2 h-6 w-6 text-primary" /> : <PlusCircle className="mr-2 h-6 w-6 text-primary" />}
              {testimonialToEdit ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}
            </CardTitle>
            <CardDescription>
              {testimonialToEdit ? 'Ubah detail testimoni di bawah ini.' : 'Isi formulir di bawah untuk menambahkan testimoni pelanggan.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={saveTestimonialAction} className="space-y-4">
              {testimonialToEdit && (
                <input type="hidden" name="originalVideoId" value={testimonialToEdit.videoId} />
              )}
              <div>
                <Label htmlFor="name">Nama</Label>
                <Input id="name" name="name" defaultValue={testimonialToEdit?.name || ''} required />
              </div>
              <div>
                <Label htmlFor="age">Usia (Opsional)</Label>
                <Input id="age" name="age" defaultValue={testimonialToEdit?.age || ''} />
              </div>
              <div>
                <Label htmlFor="quote">Kutipan Testimoni</Label>
                <Textarea id="quote" name="quote" defaultValue={testimonialToEdit?.quote || ''} required />
              </div>
              <div>
                <Label htmlFor="videoId">ID Video YouTube</Label>
                <Input id="videoId" name="videoId" placeholder="Contoh: j-z1x0erZxU" defaultValue={testimonialToEdit?.videoId || ''} required />
              </div>
              <div>
                <Label htmlFor="imageSrc">URL Gambar (Default placeholder jika kosong)</Label>
                <Input id="imageSrc" name="imageSrc" type="url" placeholder="https://urlgambar.com/foto.png" defaultValue={testimonialToEdit?.imageSrc || 'https://placehold.co/100x100.png'} />
              </div>
               <div>
                <Label htmlFor="dataAiHint">Petunjuk AI untuk Gambar</Label>
                <Input id="dataAiHint" name="dataAiHint" placeholder="Contoh: man professional" defaultValue={testimonialToEdit?.dataAiHint || 'person testimonial'} />
              </div>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                {testimonialToEdit ? <Save className="mr-2 h-4 w-4" /> : <PlusCircle className="mr-2 h-4 w-4" />}
                {testimonialToEdit ? 'Update Testimoni' : 'Tambah Testimoni'}
              </Button>
              {testimonialToEdit && (
                <Link href="/admin/dashboard">
                  <Button variant="outline" type="button" className="ml-2">
                    Batal Edit
                  </Button>
                </Link>
              )}
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Edit3 className="mr-2 h-6 w-6 text-primary" /> Daftar Testimoni
            </CardTitle>
            <CardDescription>Berikut adalah testimoni yang sudah ada. Edit atau hapus jika perlu.</CardDescription>
          </CardHeader>
          <CardContent>
            {testimonials.length === 0 ? (
              <p className="text-muted-foreground">Belum ada testimoni.</p>
            ) : (
              <ul className="space-y-4">
                {testimonials.map((testimonial) => (
                  <li key={testimonial.videoId} className="p-4 border rounded-md bg-background flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-grow">
                      <h3 className="font-semibold text-foreground">{testimonial.name} {testimonial.age && `(${testimonial.age})`}</h3>
                      <p className="text-sm text-muted-foreground italic">"{testimonial.quote}"</p>
                      <p className="text-xs text-muted-foreground mt-1">Video ID: {testimonial.videoId} | Image: {(testimonial.imageSrc && testimonial.imageSrc.startsWith('https://placehold.co')) || !testimonial.imageSrc ? 'Placeholder' : 'Custom'}</p>
                    </div>
                    <div className="flex space-x-2 flex-shrink-0">
                        <Link href={`/admin/dashboard?editVideoId=${testimonial.videoId}#edit-testimonial-form`}> 
                            <Button variant="outline" size="sm">
                                <Edit3 className="mr-1 h-4 w-4" /> Edit
                            </Button>
                        </Link>
                        <form action={deleteTestimonial} className="inline-block">
                            <input type="hidden" name="videoId" value={testimonial.videoId} />
                            <Button variant="destructive" size="sm" type="submit" onClick={() => confirm('Anda yakin ingin menghapus testimoni ini?')}>
                                <Trash2 className="mr-1 h-4 w-4" /> Hapus
                            </Button>
                        </form>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </main>
      <footer className="container mx-auto mt-12 text-center text-sm text-muted-foreground">
        <p>Panel Admin Ovisure Gold Official - Hati-hati saat melakukan perubahan.</p>
      </footer>
    </div>
  );
}
