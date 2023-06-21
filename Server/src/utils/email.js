const nodemailer = require("nodemailer");
const { User } = require("../db.js");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "test.ecomerce420@gmail.com",
    pass: "udznychvrbezjpra",
  },
});

const sendRegistrationEmail = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const mailOptionsRegistro = {
      from: "test.ecomerce420@gmail.com",
      to: user.email, // correo electrónico almacenado en User
      subject: "Registro exitoso",
      html: `
   <!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>¡Gracias por registrarte!</title>
    <style>
        body {
            font-family: Poppins, sans-serif;
            background-color: #f2f2f2;
            color: #333333;
            font-size: 16px;
            line-height: 1.5;
            margin: 0;
            padding: 0;
            align-items: center;
            justify-content: center;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .content {
            margin-bottom: 30px;
        }

        .thank-you {
            font-size: 24px;
            margin-bottom: 10px;
        }

        .message {
            font-size: 16px;
            line-height: 1.5;
        }

        .cta-button {
            display: inline-block;
            align-items: center;
            justify-content: center;
            padding: 10px 20px;
            background-color: #dd6bbb;
            color: #000000;
            text-decoration: none;
            text-style: none;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            font-weight: 800;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>¡Gracias por registrarte!</h1>
        </div>
        <div class="content">
            <p class="thank-you">¡Hola ${user.name}!</p>
            <p class="message">Gracias por registrarte en nuestro sitio. Estamos emocionados de tenerte como parte de
                nuestra comunidad.</p>
            <p class="message">Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con
                nosotros.</p>
            <p class="message">¡Esperamos que disfrutes de todos los beneficios que tenemos para ofrecerte!</p>
            <p class="message">Haz clic en el botón de abajo para comenzar a explorar nuestro sitio:</p>
            <p><a class="cta-button" href="https://front-six-liart.vercel.app/">Comenzar</a></p>
        </div>
        <div class="footer">
            <p>© 2023 Henry Project. Todos los derechos reservados.</p>
        </div>
    </div>
</body>

</html>
  `,
    };

    transporter.sendMail(mailOptionsRegistro, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Correo electrónico de registro enviado: " + info.response);
      }
    });
  } catch (error) {
    console.error("Error al enviar el correo electrónico de registro:", error);
  }
};

const sendPurchaseEmail = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const mailOptionsCompra = {
      from: "test.ecomerce420@gmail.com",
      to: user.email, // correo electrónico almacenado en User
      subject: "Confirmación de compra",
      html: `
      <!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>¡Gracias por tu compra!</title>
    <style>
        body {
            font-family: Poppins, sans-serif;
            background-color: #f2f2f2;
            color: #333333;
            font-size: 16px;
            line-height: 1.5;
            margin: 0;
            padding: 0;
            align-items: center;
            justify-content: center;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .content {
            margin-bottom: 30px;
        }

        .thank-you {
            font-size: 24px;
            margin-bottom: 10px;
        }

        .message {
            font-size: 16px;
            line-height: 1.5;
        }

        .cta-button {
            display: inline-block;
            align-items: center;
            justify-content: center;
            padding: 10px 20px;
            background-color: #dd6bbb;
            color: #000000;
            text-decoration: none;
            border-radius: 5px;
        }

        .footer {
            text-align: center;
            font-size: 14px;
            font-weight: 800;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>¡Gracias por tu compra!</h1>
        </div>
        <div class="content">
            <p class="thank-you">¡Hola ${user.name}!</p>
            <p class="message">Gracias por realizar tu compra en nuestro sitio. Esperamos que estés emocionado/a de recibir
                tu pedido.</p>
            <p class="message">Aquí tienes los detalles de tu compra:</p>
            <ul>
                <li>Producto: ${product.name}</li>
                <li>Precio: ${product.price}</li>
                <li>Fecha de compra: ${purchase.date}</li>
            </ul>
            <p class="message">Si tienes alguna pregunta o necesitas ayuda con tu pedido, no dudes en ponerte en contacto
                con nosotros.</p>
            <p class="message">¡Esperamos que disfrutes de tu compra y vuelvas pronto!</p>
            <p class="message">Haz clic en el botón de abajo para visitar nuestro sitio:</p>
            <p><a class="cta-button" href="https://front-six-liart.vercel.app/">Visitar sitio</a></p>
        </div>
        <div class="footer">
            <p>© 2023 Henry Project. Todos los derechos reservados.</p>
        </div>
    </div>
</body>

</html>
  `, };

    transporter.sendMail(mailOptionsCompra, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Correo electrónico de compra enviado: " + info.response);
      }
    });
  } catch (error) {
    console.error("Error al enviar el correo electrónico de compra:", error);
  }
};

module.exports = {
  sendRegistrationEmail,
  sendPurchaseEmail,
};

/*

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "test.ecomerce420@gmail.com",
    pass: "udznychvrbezjpra",
  },
});

const mailOptionsRegistro = {
  from: "test.ecomerce420@gmail.com",
  to: "eveloxd@gmail.com",
  subject: "Registro exitoso",
  html: "<p>Gracias por registrarte en nuestro sitio web.</p>",
};

const mailOptionsCompra = {
  from: "test.ecomerce420@gmail.com",
  to: "eveloxd@gmail.com",
  subject: "Confirmación de compra",
  html: "<p>Gracias por tu compra en nuestro sitio web.</p>",
//   attachments: [
//     {
//       filename: "factura.pdf",
//       path: "/ruta/a/la/factura.pdf",
//     },
//   ],
};

transporter.sendMail(mailOptionsRegistro, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Correo electrónico de registro enviado: ' + info.response);
  }
});

transporter.sendMail(mailOptionsCompra, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Correo electrónico de compra enviado: ' + info.response);
  }
});


// Path: src\utils\email.js

*/
