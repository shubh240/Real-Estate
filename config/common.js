const con = require('../config/database');
const admin = require('firebase-admin');
const notificationFile = require('./notification.json');
const { PUBLICURL } = require('./constants');
const { types } = require('pg');

admin.initializeApp({
  credential: admin.credential.cert(notificationFile),
});

const common = {

  updateChatRead: async (receiverId, receiverType, senderId, senderType) => {
    try {
      const query = `UPDATE tbl_chat SET is_read = '1' WHERE (
      (receiver_type = $1 AND receiver_id = $2 AND sender_type = $3 AND sender_id = $4) 
      OR 
      (receiver_type = $3 AND receiver_id = $4 AND sender_type = $1 AND sender_id = $2)
    ) 
        AND is_read = '0'
      `;

      const values = [receiverType, receiverId, senderType, senderId];

      const result = await con.query(query, values);

      return true;

    } catch (error) {
      return false;
    }
  },

  /**
   * 
   * Multiple Send 
   */
  send_push: function (registrationIds, data) {
    if (Array.isArray(registrationIds)) {
      registrationIds.forEach((token) => {
        admin.messaging().send({
          token: token,
          notification: {
            title: data.title,
            body: data.message,
          },
          data: {
            sender_id: data?.sender_id.toString(),
            sender_type: data?.sender_type.toString(),
            receiver_type: data?.receiver_type.toString(),
            receiver_id: data?.receiver_id.toString(),
            message: data?.message.toString(),
            tag: data?.notification_tag.toString(),
          },
          apns: {
            payload: {
              aps: {
                sound: "default",
              },
            },
          },
        })
          .then((res) => {
            console.log("res :", res);
          })
          .catch((error) => {
            console.log("error------------ :", error);
          });
      });
    } else {
      admin.messaging().send({
        token: registrationIds,
        notification: {
          title: data.title,
          body: data.message,
        },
        data: {
          sender_id: data?.sender_id.toString(),
          sender_type: data?.sender_type.toString(),
          receiver_type: data?.receiver_type.toString(),
          receiver_id: data?.receiver_id.toString(),
          message: data?.message.toString(),
          tag: data?.notification_tag.toString(),
        },
        apns: {
          payload: {
            aps: {
              sound: "default",
            },
          },
        },
      })
        .then((res) => {
          console.log("res ********************************************************** :", res);
        })
        .catch((error) => {
          console.log("error------------ :", error);
        });
    }
  },

  prepare_notification: async (data) => {
    const query = `SELECT id FROM tbl_user WHERE id = ${data.receiver_id} AND is_active = 1 AND is_deleted = 0`;

    const { rows: userRows } = await con.query(query);

    if (userRows.length > 0 && userRows[0]?.id) {
      const result = await con.query(`SELECT ud.user_id, ud.token, ud.device_token FROM tbl_user_device ud WHERE ud.user_id = '${data.receiver_id}'`)
      if (result.rows.length > 0) {
        result.rows.forEach((row) => {
          if (row.device_token && row.device_token !== "0") {
            common.send_push(row.device_token, data);
          } else {
            console.error(`Error: Invalid device token for user ID ${row.user_id}`);
          }
        });
      } else {
        console.error("Error: Device tokens are not found");
      }
    }
    else {
      console.error("Error: User not found or inactive");
    }

    await common.insertNotificationIntoDatabase(data);
  },

  insertNotificationIntoDatabase: async (data) => {
    const notification_data = {
      title: data.title,
      sender_id: data.sender_id,
      sender_type: data.sender_type,
      receiver_type: data.receiver_type,
      receiver_id: data.receiver_id,
      message: data.message,
      notification_tag: data.notification_tag
    };
    let sql = `INSERT INTO tbl_notification (title, sender_id, sender_type, receiver_type,receiver_id,message,notification_tag) VALUES ($1, $2, $3, $4,$5,$6,$7) RETURNING id`;
    let values = [data.title, data.sender_id, data.sender_type, data.receiver_type, data.receiver_id, data.message, data.notification_tag];

    let { rows } = await con.query(sql, values);

  },

  sendOtpTemplate: async (result) => {

    const getTitle = (type) => {
      switch (type) {
        case "Sign-Up Otp":
          return 'OTP For Website Sign-Up';
        case "Resend Otp":
          return '';
        case "Forgot Otp":
          return 'OTP For Password Reset';
        case "Update Profile":
          return 'OTP For Update Profile';
        default:
          return 'OTP For Website Login';
      }
    };

    const getMessage = (type) => {
      switch (type) {
        case "Sign-Up Otp":
          return 'signup';
        case "Resend Otp":
          return '';
        case "Forgot Otp":
          return 'reset your password';
        case "Update Profile":
          return 'update your profile';
        default:
          return 'login';
      }
    };

    const template = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <title>${getTitle(result?.type)}</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #e6f2f8; padding: 20px; margin: 0;">
      <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px;">
          <div style="text-align: center;">
              <img src=${process.env.LOGO} alt="Logo" style="width: 80px;" />
          </div>
          <h2 style="color: #000; text-align: center;">${getTitle(result?.type)}</h2>
          <p>Hey,</p>
          <p>To complete your verification for ${getMessage(result?.type)} on bboyorealestate, please use the following one-time password (OTP):</p>
          <p style="text-align: center; font-size: 18px;"><strong>Your OTP: ${result?.otp}</strong></p>
          <p><strong>Note:</strong> This OTP is valid for a limited time, usually 60 Seconds, and should not be shared with anyone. If you did not request this OTP, please ignore this message.</p>
          <p>If you have any questions or need further assistance, please don't hesitate to reach out to us at <a href="mailto:bboyorealestate@gmail.com" style="color: #007bff;">bboyorealestate@gmail.com</a></p>
          <p>Thank you<br>The Real-Estate Team</p>
      </div>
  </body>
  </html>`;

    return template;
  },

  sendEmailTemplate: async (result) => {

    const getTitle = (type) => {
      switch (type) {
        case "Agent Profile":
          return 'Welcome to Our Platform!';
        case "Lender Profile":
          return '';
        default:
          return 'Welcome to Our Platform!';
      }
    };

    const getName = (type) => {
      switch (type) {
        case "Agent Profile":
          return 'agent';
        case "Lender Profile":
          return 'lender';
      }
    }

    const template = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <title>Welcome to Our Platform!</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #e6f2f8; padding: 20px; margin: 0;">
      <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px;">
          <div style="text-align: center;">
              <img src=${process.env.LOGO} alt="Logo" style="width: 80px;" />
          </div>
          <h1>Welcome, ${result?.name}!</h1>
          <p>Your ${getName(result?.type)} request has been successfully submitted. For subscription payments, please contact the admin.</p>
          <p>If you have any questions or need further assistance, please don't hesitate to reach out to us at <a href="mailto:bboyorealestate@gmail.com" style="color: #007bff;">bboyorealestate@gmail.com</a></p>
          <p>Thank you<br>The Real-Estate Team</p>
      </div>
  </body>
  </html>`;

    return template;
  },

  sendEmailTemplateForEdit: async (result) => {

    const getTitle = (type) => {
      switch (type) {
        case "Agent Profile":
          return 'Welcome to Our Platform!';
        case "Lender Profile":
          return '';
        default:
          return 'Welcome to Our Platform!';
      }
    };

    const getName = (type) => {
      switch (type) {
        case "Agent Profile":
          return 'agent';
        case "Lender Profile":
          return 'lender';
      }
    }

    const template = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <title>Welcome to Our Platform!</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #e6f2f8; padding: 20px; margin: 0;">
      <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px;">
          <div style="text-align: center;">
              <img src=${process.env.LOGO} alt="Logo" style="width: 80px;" />
          </div>
          <h1>Thank your for joining with us, ${result?.name}!</h1>
          <p>Your ${getName(result?.type)} request has been approved.</p>
          <p>If you have any questions or need further assistance, please don't hesitate to reach out to us at <a href="mailto:bboyorealestate@gmail.com" style="color: #007bff;">bboyorealestate@gmail.com</a></p>
          <p>Thank you<br>The Real-Estate Team</p>
      </div>
  </body>
  </html>`;

    return template;
  },

  generateContactUsTemplate: async (subject, name, description, email) => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>${subject}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #e6f2f8;
            padding: 20px;
            margin: 0;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 10px;
        }
        h2 {
            color: #000;
            text-align: center;
        }
        .highlight {
            color: #007bff;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>${subject}</h2>
        <p>Hey <span class="highlight">admin</span>,</p>
        <p>I hope this email finds you well.</p>
        <p>My name is ${name}, and I am a user of bboyorealestate. I am reaching out to you today to share my feedback and concerns regarding the user experience.</p>
        <p>${description}</p>
        <p>${name}'s email is ${email}</p>
        <p>Best regards,<br>${name}</p>
    </div>
</body>
</html>
    `;
  },

  sendContactUsForEdit: async (result) => {

    const template = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <title>Your Query Has Been Resolved - Thank You!</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #e6f2f8; padding: 20px; margin: 0;">
      <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px;">
          <div style="text-align: center;">
              <img src=${process.env.LOGO} alt="Logo" style="width: 80px;" />
          </div>
          <h1>Thank you for contacting us!</h1>
          <p>Your query has been resolved.</p>
          <p>If you have any questions or need further assistance, please don't hesitate to reach out to us at <a href="mailto:bboyorealestate@gmail.com" style="color: #007bff;">bboyorealestate@gmail.com</a></p>
          <p>Thank you<br>The Real-Estate Team</p>
      </div>
  </body>
  </html>`;

    return template;
  },


}


module.exports = common;