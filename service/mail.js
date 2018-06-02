var mailer = require("nodemailer/lib/mail-composer"),
    settings = require("./../settings");

module.exports = {
    formatEnquiryMail: (payload)=>{

        let emailTemplate = `
            <style>
                <td>
                    td{
                        text-align: center;
                        word-break: break-all;
                    }
                    thead tr td{
                        font-weight: bold;
                    }
                </td>
            </style>
            <h4>Hi Team,</h4><br/>
            <div style="width:100%;">
                <table style="width:100%;">
                    <thead>
                        <tr>
                            <td style="width: 15%;">Name</td>
                            <td style="width: 15%;">Email</td>
                            <td style="width: 20%;">Company Name</td>
                            <td style="width: 20%;">Contact Number</td>
                            <td style="width: 30%;">Message</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="width: 15%;">${payload.name}</td>
                            <td style="width: 15%;">${payload.email}</td>
                            <td style="width: 20%;">${payload.companyName}</td>
                            <td style="width: 20%;">${payload.contactNumber}</td>
                            <td style="width: 30%;">${payload.message}</td>
                        </tr>
                    </tbody>
                </table>
                <img src="cid:enquiryImage" alt=""/>
            </div>
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

