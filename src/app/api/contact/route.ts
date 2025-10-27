import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form data
    const personal = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      phone: formData.get('phone') as string,
      email: formData.get('email') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      province: formData.get('province') as string,
      postalCode: formData.get('postalCode') as string,
    };

    const vehicle = {
      vin: formData.get('vin') as string,
      make: formData.get('make') as string,
      model: formData.get('model') as string,
      submodel: formData.get('submodel') as string,
      year: formData.get('year') as string,
      mileageKm: formData.get('mileageKm') as string,
      isAccidented: formData.get('isAccidented') === 'true',
    };

    // Get photos
    const photos = formData.getAll('photos') as File[];

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Prepare attachments
    const attachments = await Promise.all(photos.map(async (photo, index) => ({
      filename: `photo-${index + 1}.${photo.type.split('/')[1]}`,
      content: Buffer.from(await photo.arrayBuffer()),
      contentType: photo.type,
    })));

    // Email content
    const html = `
      <h2>Nouvelle demande de vente de véhicule</h2>
      
      <h3>Informations personnelles</h3>
      <p><strong>Nom:</strong> ${personal.firstName} ${personal.lastName}</p>
      <p><strong>Téléphone:</strong> ${personal.phone}</p>
      <p><strong>Courriel:</strong> ${personal.email}</p>
      <p><strong>Adresse:</strong> ${personal.address}, ${personal.city}, ${personal.province} ${personal.postalCode}</p>
      
      <h3>Détails du véhicule</h3>
      ${vehicle.vin ? `<p><strong>VIN:</strong> ${vehicle.vin}</p>` : ''}
      <p><strong>Véhicule:</strong> ${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.submodel}</p>
      <p><strong>Kilométrage:</strong> ${vehicle.mileageKm} km</p>
      <p><strong>Accidenté:</strong> ${vehicle.isAccidented ? 'Oui' : 'Non'}</p>
      
      <p><strong>Nombre de photos:</strong> ${photos.length}</p>
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONTACT_EMAIL,
      subject: 'Nouvelle demande de vente de véhicule - Millenium Auto',
      html,
      attachments,
    });

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
  }
}