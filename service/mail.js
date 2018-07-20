var mailer = require("nodemailer/lib/mail-composer"),
    settings = require("./../settings");

module.exports = {
    formatEnquiryMail: (payload)=>{
        let emailTemplate = `      
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
            <title>Enquiry Details</title>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0 " />
            <meta name="format-detection" content="telephone=no" />
            <!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
            <!--<![endif]-->
            <style type="text/css">
              body {
              -webkit-text-size-adjust: 100% !important;
              -ms-text-size-adjust: 100% !important;
              -webkit-font-smoothing: antialiased !important;
              }
              img {
              border: 0 !important;
              outline: none !important;
              }
              p {
              Margin: 0px !important;
              Padding: 0px !important;
              }
              table {
              border-collapse: collapse;
              mso-table-lspace: 0px;
              mso-table-rspace: 0px;
              }
              td, a, span {
              border-collapse: collapse;
              mso-line-height-rule: exactly;
              }
              .ExternalClass * {
              line-height: 100%;
              }
              span.MsoHyperlink {
              mso-style-priority:99;
              color:inherit;}
              span.MsoHyperlinkFollowed {
              mso-style-priority:99;
              color:inherit;}
              </style>
              <style media="only screen and (min-width:481px) and (max-width:599px)" type="text/css">
              @media only screen and (min-width:481px) and (max-width:599px) {
              table[class=em_main_table] {
              width: 100% !important;
              }
              table[class=em_wrapper] {
              width: 100% !important;
              }
              td[class=em_hide], br[class=em_hide] {
              display: none !important;
              }
              img[class=em_full_img] {
              width: 100% !important;
              height: auto !important;
              }
              td[class=em_align_cent] {
              text-align: center !important;
              }
              td[class=em_aside]{
              padding-left:10px !important;
              padding-right:10px !important;
              }
              td[class=em_height]{
              height: 20px !important;
              }
              td[class=em_font]{
              font-size:14px !important;    
              }
              td[class=em_align_cent1] {
              text-align: center !important;
              padding-bottom: 10px !important;
              }
              }
              </style>
              <style media="only screen and (max-width:480px)" type="text/css">
              @media only screen and (max-width:480px) {
              table[class=em_main_table] {
              width: 100% !important;
              }
              table[class=em_wrapper] {
              width: 100% !important;
              }
              td[class=em_hide], br[class=em_hide], span[class=em_hide] {
              display: none !important;
              }
              img[class=em_full_img] {
              width: 100% !important;
              height: auto !important;
              }
              td[class=em_align_cent] {
              text-align: center !important;
              }
              td[class=em_align_cent1] {
              text-align: center !important;
              padding-bottom: 10px !important;
              }
              td[class=em_height]{
              height: 20px !important;
              }
              td[class=em_aside]{
              padding-left:10px !important;
              padding-right:10px !important;
              } 
              td[class=em_font]{
              font-size:14px !important;
              line-height:28px !important;
              }
              span[class=em_br]{
              display:block !important;
              }
              }
            </style>
          </head>
          <body style="margin:0px; padding:0px;" bgcolor="#ffffff">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
              <tr>
                <td align="center" valign="top">
                  <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="em_main_table" style="table-layout:fixed;">
                    <!-- === LOGO SECTION === -->
                    <tr>
                      <td align="center" valign="top" bgcolor="#0052A7">
                        <table width="90%" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td height="20" class="em_height">&nbsp;</td>
                          </tr>
                          <tr>
                            <td valign="top"><a href="#" target="_blank" style="text-decoration:none;"><img src="logo.png" style="display:block;font-family: Arial, sans-serif; font-size:15px; line-height:18px; color:#ffffff;  font-weight:bold;" border="0" alt="LoGo" /></a></td>
                          </tr>
                          <tr>
                            <td height="20" class="em_height">&nbsp;</td>
                          </tr>
                          <tr>
                            <td align="center" style="font-family:'Open Sans', Arial, sans-serif; font-size:32px; font-weight:normal; line-height:44px; color:#ffffff;">Enquiry Details</td>
                          </tr>
                          <tr>
                            <td height="50" class="em_height">&nbsp;</td>
                          </tr>
                          <tr>
                            <td valign="top" align="center" class="em_height">
                              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td align="center" valign="top" class="em_aside" bgcolor="#ffffff">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                      <tr>
                                        <td valign="middle" align="center"><img src="cid:enquiryImage" alt="" width="100%" style="display:block; font-family:Arial, sans-serif; font-size:25px; line-height:303px; color:#c27cbb; max-width:100%;" class="em_full_img" border="0" /></td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                    </td>
                  </tr>
                    <tr>
                      <td align="center" valign="top" class="em_aside" bgcolor="#DEE9F4">
                        <table width="90%" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td align="center" valign="top" class="em_aside" bgcolor="#ffffff">
                              <table width="90%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td height="30" class="em_height">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td style="font-family:'Open Sans', Arial, sans-serif; font-size:10px; font-weight:normal; line-height:20px; color:#969696;">Name
                                </td>
                                </tr>
                                <tr>
                                  <td style="font-family:'Open Sans', Arial, sans-serif; font-size:15px; font-weight:bold; line-height:28px; color:#30373b;">${payload.name}
                                </td>
                                </tr>
                                <tr>
                                  <td height="20" class="em_height">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td style="font-family:'Open Sans', Arial, sans-serif; font-size:10px; font-weight:normal; line-height:20px; color:#969696;">Email
                                </td>
                                </tr>
                                <tr>
                                  <td style="font-family:'Open Sans', Arial, sans-serif; font-size:15px; font-weight:bold; line-height:28px; color:#30373b;">${payload.email}
                                </td>
                                </tr>
                                <tr>
                                  <td height="20" class="em_height">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td style="font-family:'Open Sans', Arial, sans-serif; font-size:10px; font-weight:normal; line-height:20px; color:#969696;">Company Name
                                </td>
                                </tr>
                                <tr>
                                  <td style="font-family:'Open Sans', Arial, sans-serif; font-size:15px; font-weight:bold; line-height:28px; color:#30373b;">${payload.companyName}
                                </td>
                                </tr>
                                <tr>
                                  <td height="20" class="em_height">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td style="font-family:'Open Sans', Arial, sans-serif; font-size:10px; font-weight:normal; line-height:20px; color:#969696;">Contact Number
                                </td>
                                </tr>
                                <tr>
                                  <td style="font-family:'Open Sans', Arial, sans-serif; font-size:15px; font-weight:bold; line-height:28px; color:#30373b;">${payload.contactNumber}
                                </td>
                                </tr>
                                <tr>
                                  <td height="20" class="em_height">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td style="font-family:'Open Sans', Arial, sans-serif; font-size:10px; font-weight:normal; line-height:20px; color:#969696;">Message
                                </td>
                                </tr>
                                <tr>
                                  <td style="font-family:'Open Sans', Arial, sans-serif; font-size:13px; font-weight:normal; line-height:18px; color:#212121;">${payload.message}
                                </td>
                                </tr>
                                <tr>
                                  <td height="40" class="em_height">&nbsp;</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td align="center" valign="top" class="em_aside">
                  <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="em_main_table" style="table-layout:fixed;">
                    <tr>
                      <td align="center" valign="top"  bgcolor="#30373b" class="em_aside">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td height="20" class="em_height">&nbsp;</td>
                          </tr>
                          <tr>
                            <td align="center" style="font-family:'Open Sans', Arial, sans-serif; font-size:12px; line-height:18px; color:#848789;text-transform:uppercase;">&copy;2018 company name. All Rights Reserved.
                          </td>
                          </tr>
                          <tr>
                            <td height="20" class="em_height">&nbsp;</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>     
        `;

       return new mailer({
            from: settings.email.from,
            to: settings.email.toList,
            cc: settings.email.ccList,
            subject: 'An Enquiry',
            html: emailTemplate,
            attachments: [
              {
                    filename: "enquiry",
                    cid: "enquiryImage",
                    content: payload.file,
                    encoding: "base64"
              }
            ]
        });
    }
};

