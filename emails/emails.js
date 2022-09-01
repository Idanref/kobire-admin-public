const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// will also include purchase info + workshop info
const sendReceipt = (name, email, phone, numOfTickets, price, location, date, time) => {
  // returns a promise
  sgMail.send({
    // add kobi's email to array in order to be notified
    to: [email, 'idanrefdev@gmail.com'],
    from: 'idanref@gmail.com',
    subject: 'תודה שהצטרפת אלינו!',
    html: sendReceiptEmailHtml(name, email, phone, numOfTickets, price, location, date, time),
  });
};

function sendReceiptEmailHtml(name, email, phone, numOfTickets, price, location, date, time) {
  return `
  <body>
      <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;">
        <div class="webkit">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
            <tr>
              <td valign="top" bgcolor="#FFFFFF" width="100%">
                <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td width="100%">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td>
                            <!--[if mso]>
    <center>
    <table><tr><td width="600">
  <![endif]-->
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                      <tr>
                                        <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
    <tr>
      <td role="module-content">
        <p>פרטי ההזמנה שלך</p>
      </td>
    </tr>
  </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="50c84fb8-698c-4c29-a72e-90246f9ef056">
    <tbody>
      <tr>
        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="600" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/44dc6b38d11b4510/f0592154-48e6-4b25-8fac-7f4e3772073c/787x301.png">
        </td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="3f35464e-02d1-45be-a2d7-a3a0178bb4a6" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:0px 0px 0px 0px; line-height:30px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><h2 style="text-align: center"><span style="font-family: &quot;comic sans ms&quot;, cursive"><strong>!ברוכים הבאים</strong></span></h2><div></div></div></td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="f4f02cb9-a889-4b45-9ac9-0baca7ba301e" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:0px 0px 0px 0px; line-height:8px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div>
<h3 style="text-align: center; font-family: inherit"><br></h3>
<h3 style="text-align: center; font-family: inherit">!תודה שהצטרפתם אלינו לסדנת הצילום</h3>
<h3 style="text-align: center; font-family: inherit">נשמח לראותכם</h3>
<h3 style="text-align: center; font-family: inherit"><br></h3>
<h3 style="text-align: center; font-family: inherit">- להלן פרטי ההזמנה לסדנה -</h3>
<h3 style="text-align: center; font-family: inherit"><br></h3>
<h3 style="text-align: center; font-family: inherit">שם: ${name}</h3>
<h3 style="text-align: center; font-family: inherit">${email} :אימייל</h3>
<h3 style="text-align: center; font-family: inherit">${phone} :טלפון</h3>
<h3 style="text-align: center; font-family: inherit"><br></h3>
<h3 style="text-align: center; font-family: inherit">${numOfTickets} :מספר כרטיסים</h3>
<h3 style="text-align: center; font-family: inherit">₪${price} :סה״כ מחיר</h3>
<h3 style="text-align: center; font-family: inherit"><br></h3>
<h3 style="text-align: center; font-family: inherit">מיקום הסדנה: ${location}</h3>
<h3 style="text-align: center; font-family: inherit">${date} :תאריך</h3>
<h3 style="text-align: center; font-family: inherit">${time} :שעה</h3>
<h3 style="text-align: center; font-family: inherit"><br></h3>
<h3 style="text-align: center; font-family: inherit">------</h3>
<h3 style="text-align: center; font-family: inherit">שם המנחה: קובי רפאלי</h3>
<h3 style="text-align: center; font-family: inherit">טלפון: 050-580-8282</h3>
<h3 style="text-align: center; font-family: inherit">kobire@gmail.com :מייל</h3>
<h3 style="text-align: center; font-family: inherit"><br></h3>
<a href="https://www.instagram.com/kobi_refaeli/?hl=en"><h3 style="text-align: center; font-family: inherit">@kobire :חפשו אותי באינסטגרם</h3></a>
<div></div></div></td>

      </tr>
    </tbody>
  </table></td>
                                      </tr>
                                    </table>
                                    <!--[if mso]>
                                  </td>
                                </tr>
                              </table>
                            </center>
                            <![endif]-->
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </center>
    </body>
  `;
}

module.exports = {
  sendReceipt,
};
