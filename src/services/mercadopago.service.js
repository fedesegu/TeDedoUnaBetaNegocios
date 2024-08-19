import mercadopago from "mercadopago";
import pool from "../DB/configDB.js"; 

export const handleIpnNotification = async (notificationData) => {
  try {
    // 1. Validar la autenticidad de la notificación
    const isValidNotification = await mercadopago.ipn.validate(notificationData);

    if (!isValidNotification) {
      console.error('Notificación IPN inválida');
      return; 
    }

    // 2. Extraer información relevante
    const paymentId = notificationData.data.id;
    const externalReference = notificationData.data.external_reference;
    const paymentStatus = notificationData.data.status;

    // 3. Actualizar el estado del pedido en la tabla 'ordenes'
    if (paymentStatus === 'approved') {
      const updateQuery = `
        UPDATE ordenes 
        SET payment_status = 'approved' 
        WHERE id = ?
      `;

      await pool.query(updateQuery, [externalReference]);

      // 4. Insertar el paymentId en la tabla 'Webhook'
      const insertQuery = `
        INSERT INTO Webhook (payment_id) 
        VALUES (?)
      `;

      await pool.query(insertQuery, [paymentId]);

      console.log('Pedido actualizado a "aprobado":', externalReference);
      console.log('paymentId insertado en Webhook:', paymentId);
    } else {
      console.log('Estado del pago no requiere actualización:', paymentStatus);
    }

  } catch (error) {
    console.error('Error al procesar la notificación IPN:', error);
    // ... (Manejo de errores adecuado)
  }
};
