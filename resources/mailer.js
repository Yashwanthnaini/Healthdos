const nodemailer = require("nodemailer");

module.exports = async function(email,token,name,type,who) {
    const verifyUrl = `https://healthdos.herokuapp.com/api/${who}/verify/${token}`
    const resetUrl = `http://localhost:3000/resetpassword/${who}/${token}`
    const homeUrl = `https://healthdos.herokuapp.com/`
    // Create the SMTP transport.
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      auth: {
        user: "b171561@rgukt.ac.in",
        pass: "DRZwGEPUxBAVO4Km",
      },
    });
    const senderAddress = "nainiyashwanth@gmail.com";
    var toAddress = email;
    if(type == "verify"){
      var subject = "Verify your email";
      var body_html = `
      <!doctype html>
        <html ⚡4email data-css-strict>

        <head>
          <meta charset="utf-8">
          <meta name="x-apple-disable-message-reformatting">
          <style amp4email-boilerplate>
            body {
              visibility: hidden
            }
          </style>

          <script async src="https://cdn.ampproject.org/v0.js"></script>


          <style amp-custom>
            .u-row {
              display: flex;
              flex-wrap: nowrap;
              margin-left: 0;
              margin-right: 0;
            }
            
            .u-row .u-col {
              position: relative;
              width: 100%;
              padding-right: 0;
              padding-left: 0;
            }
            
            .u-row .u-col.u-col-100 {
              flex: 0 0 100%;
              max-width: 100%;
            }
            
            @media (max-width: 767px) {
              .u-row:not(.no-stack) {
                flex-wrap: wrap;
              }
              .u-row:not(.no-stack) .u-col {
                flex: 0 0 100%;
                max-width: 100%;
              }
            }
            
            body {
              margin: 0;
              padding: 0;
            }
            
            table,
            tr,
            td {
              vertical-align: top;
              border-collapse: collapse;
            }
            
            p {
              margin: 0;
            }
            
            .ie-container table,
            .mso-container table {
              table-layout: fixed;
            }
            
            * {
              line-height: inherit;
            }
            
            table,
            td {
              color: #000000;
            }
            
            a {
              color: #0000ee;
              text-decoration: underline;
            }
          </style>


        </head>

        <body class="clean-body u_body" style="margin: 0;padding: 0;background-color: #f9f9f9;color: #000000">
          <!--[if IE]><div class="ie-container"><![endif]-->
          <!--[if mso]><div class="mso-container"><![endif]-->
          <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
            <tbody>
              <tr style="vertical-align: top">
                <td style="word-break: break-word;border-collapse: collapse;vertical-align: top">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->

                  <div style="padding: 0px;">
                    <div style="max-width: 600px;margin: 0 auto;">
                      <div class="u-row">

                        <div class="u-col u-col-100">
                          <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">

                            <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">

                                    <div style="color: #afb0c7; line-height: 170%; text-align: center; word-wrap: break-word;">
                                      <p style="font-size: 14px; line-height: 170%;"><span style="font-size: 14px; line-height: 23.8px;">Email Verification</span></p>
                                    </div>

                                  </td>
                                </tr>
                              </tbody>
                            </table>

                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div style="padding: 0px;">
                    <div style="max-width: 600px;margin: 0 auto;background-color: #003399;">
                      <div class="u-row">

                        <div class="u-col u-col-100">
                          <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">

                            <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:'Cabin',sans-serif;" align="left">

                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                      <tr>
                                        <td style="padding-right: 0px;padding-left: 0px;" align="center">

                                          <amp-img alt="Image" src="https://cdn.templates.unlayer.com/assets/1597218650916-xxxxc.png" width="335" height="93" layout="intrinsic" style="width: 26%;max-width: 26%;">

                                          </amp-img>
                                        </td>
                                      </tr>
                                    </table>

                                  </td>
                                </tr>
                              </tbody>
                            </table>

                            <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">

                                    <div style="color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                      <p style="font-size: 14px; line-height: 140%;"><strong>T H A N K S&nbsp; &nbsp;F O R&nbsp; &nbsp;S I G N I N G&nbsp; &nbsp;U P !</strong></p>
                                    </div>

                                  </td>
                                </tr>
                              </tbody>
                            </table>

                            <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 31px;font-family:'Cabin',sans-serif;" align="left">

                                    <div style="color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                                      <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px;"><strong><span style="line-height: 39.2px; font-size: 28px;">Verify Your E-mail Address </span></strong>
                                        </span>
                                      </p>
                                    </div>

                                  </td>
                                </tr>
                              </tbody>
                            </table>

                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div style="padding: 0px;">
                    <div style="max-width: 600px;margin: 0 auto;background-color: #ffffff;">
                      <div class="u-row">

                        <div class="u-col u-col-100">
                          <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">

                            <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif;" align="left">

                                    <div style="line-height: 160%; text-align: center; word-wrap: break-word;">
                                      <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 22px; line-height: 35.2px;">Hi ${name}, </span></p>
                                      <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 18px; line-height: 28.8px;">Welcome, to the Health Diet Online Search community.Please click on the button below to verify your email address and enjoy community services with us! </span></p>
                                    </div>

                                  </td>
                                </tr>
                              </tbody>
                            </table>

                            <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">

                                    <div align="center">
                                      <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse;  font-family:'Cabin',sans-serif;"><tr><td style="font-family:'Cabin',sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:46px; v-text-anchor:middle; width:234px;" arcsize="8.5%" stroke="f" fillcolor="#ff6600"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Cabin',sans-serif;"><![endif]-->
                                      
                                      <a href="${verifyUrl}" target="_blank" style="box-sizing: border-box;display: inline-block;font-family:'Cabin',sans-serif;text-decoration: none;text-align: center;color: #FFFFFF; background-color: #ff6600; border-radius: 4px;  width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; ">
                                        <span style="display:block;padding:14px 44px 13px;line-height:120%;"><span style="font-size: 16px; line-height: 19.2px;"><strong><span style="line-height: 19.2px; font-size: 16px;">VERIFY YOUR EMAIL</span></strong>
                                        </span>
                                        </span>
                                      </a>
                                      <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
                                    </div>

                                  </td>
                                </tr>
                              </tbody>
                            </table>

                            <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px 60px;font-family:'Cabin',sans-serif;" align="left">

                                    <div style="line-height: 160%; text-align: center; word-wrap: break-word;">
                                      <p style="line-height: 160%; font-size: 14px;"><span style="font-size: 18px; line-height: 28.8px;">Thanks,</span></p>
                                      <p style="line-height: 160%; font-size: 14px;"><span style="font-size: 18px; line-height: 28.8px;">Health Diet Online Search community</span></p>
                                    </div>

                                  </td>
                                </tr>
                              </tbody>
                            </table>

                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div style="padding: 0px;">
                    <div style="max-width: 600px;margin: 0 auto;background-color: #e5eaf5;">
                      <div class="u-row">

                        <div class="u-col u-col-100">
                          <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">

                            <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td style="overflow-wrap:break-word;word-break:break-word;padding:41px 55px 18px;font-family:'Cabin',sans-serif;" align="left">

                                    <div style="color: #003399; line-height: 160%; text-align: center; word-wrap: break-word;">
                                      <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 20px; line-height: 32px;"><strong>Get in touch</strong></span></p>
                                      <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 16px; line-height: 25.6px; color: #000000;">nainiyashwanth@gmail.com</span></p>
                                      <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 16px; line-height: 25.6px; color: #000000;">smurari@gmail.com</span></p>
                                    </div>

                                  </td>
                                </tr>
                              </tbody>
                            </table>

                            <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 33px;font-family:'Cabin',sans-serif;" align="left">
                                    <div style="text-align:center;line-height:0px">
                                      <a href="https://facebook.com/" target="_blank" style="display:inline-block;width:32px;height:32px;margin-right:17px">
                                        <amp-img src="https://cdn.tools.unlayer.com/social/icons/circle-black/facebook.png" width="32" height="32" />
                                      </a>
                                      <a href="https://linkedin.com/" target="_blank" style="display:inline-block;width:32px;height:32px;margin-right:17px">
                                        <amp-img src="https://cdn.tools.unlayer.com/social/icons/circle-black/linkedin.png" width="32" height="32" />
                                      </a>
                                      <a href="https://instagram.com/" target="_blank" style="display:inline-block;width:32px;height:32px;margin-right:17px">
                                        <amp-img src="https://cdn.tools.unlayer.com/social/icons/circle-black/instagram.png" width="32" height="32" />
                                      </a>
                                      <a href="https://youtube.com/" target="_blank" style="display:inline-block;width:32px;height:32px;margin-right:17px">
                                        <amp-img src="https://cdn.tools.unlayer.com/social/icons/circle-black/youtube.png" width="32" height="32" />
                                      </a>
                                      <a href="https://email.com/" target="_blank" style="display:inline-block;width:32px;height:32px;margin-right:0px">
                                        <amp-img src="https://cdn.tools.unlayer.com/social/icons/circle-black/email.png" width="32" height="32" />
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>

                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div style="padding: 0px;">
                    <div style="max-width: 600px;margin: 0 auto;background-color: #003399;">
                      <div class="u-row">

                        <div class="u-col u-col-100">
                          <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">

                            <table style="font-family:'Cabin',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif;" align="left">

                                    <div style="color: #fafafa; line-height: 180%; text-align: center; word-wrap: break-word;">
                                      <p style="font-size: 14px; line-height: 180%;"><span style="font-size: 16px; line-height: 28.8px;">Copyrights &copy; Health Diet Online Search community All Rights Reserved</span></p>
                                    </div>

                                  </td>
                                </tr>
                              </tbody>
                            </table>

                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                  <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
          <!--[if mso]></div><![endif]-->
          <!--[if IE]></div><![endif]-->
        </body>

        </html>
      `;
    }
    else if(type == "reset"){
      var subject = "Reset your password";
      var body_html = `
      <!DOCTYPE html>
      <html >
        <head>
          <meta charset="UTF-8">
          <title>Reset Your Password</title> 
          
        </head>

        <body>

          <!doctype html>
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

      <head>
        <!-- NAME: 1 COLUMN -->
        <!--[if gte mso 15]>
            <xml>
              <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
          <![endif]-->
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Reset Your Password</title>
        <!--[if !mso]>
            <!-- -->
        <link href='https://fonts.googleapis.com/css?family=Asap:400,400italic,700,700italic' rel='stylesheet' type='text/css'>
        <!--<![endif]-->
        <style type="text/css">
          @media only screen and (min-width:768px){
                .templateContainer{
                    width:600px !important;
                }
        
        }   @media only screen and (max-width: 480px){
                body,table,td,p,a,li,blockquote{
                    -webkit-text-size-adjust:none !important;
                }
        
        }   @media only screen and (max-width: 480px){
                body{
                    width:100% !important;
                    min-width:100% !important;
                }
        
        }   @media only screen and (max-width: 480px){
                #bodyCell{
                    padding-top:10px !important;
                }
        
        }   @media only screen and (max-width: 480px){
                .mcnImage{
                    width:100% !important;
                }
        
        }   @media only screen and (max-width: 480px){
              
        .mcnCaptionTopContent,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer{
                    max-width:100% !important;
                    width:100% !important;
                }
        
        }   @media only screen and (max-width: 480px){
                .mcnBoxedTextContentContainer{
                    min-width:100% !important;
                }
        
        }   @media only screen and (max-width: 480px){
                .mcnImageGroupContent{
                    padding:9px !important;
                }
        
        }   @media only screen and (max-width: 480px){
                .mcnCaptionLeftContentOuter
        .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
                    padding-top:9px !important;
                }
        
        }   @media only screen and (max-width: 480px){
                .mcnImageCardTopImageContent,.mcnCaptionBlockInner
        .mcnCaptionTopContent:last-child .mcnTextContent{
                    padding-top:18px !important;
                }
        
        }   @media only screen and (max-width: 480px){
                .mcnImageCardBottomImageContent{
                    padding-bottom:9px !important;
                }
        
        }   @media only screen and (max-width: 480px){
                .mcnImageGroupBlockInner{
                    padding-top:0 !important;
                    padding-bottom:0 !important;
                }
        
        }   @media only screen and (max-width: 480px){
                .mcnImageGroupBlockOuter{
                    padding-top:9px !important;
                    padding-bottom:9px !important;
                }
        
        }   @media only screen and (max-width: 480px){
                .mcnTextContent,.mcnBoxedTextContentColumn{
                    padding-right:18px !important;
                    padding-left:18px !important;
                }
        
        }   @media only screen and (max-width: 480px){
                .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
                    padding-right:18px !important;
                    padding-bottom:0 !important;
                    padding-left:18px !important;
                }
        
        }   @media only screen and (max-width: 480px){
                .mcpreview-image-uploader{
                    display:none !important;
                    width:100% !important;
                }
        
        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Heading 1
            @tip Make the first-level headings larger in size for better readability
        on small screens.
            */
                h1{
                    /*@editable*/font-size:20px !important;
                    /*@editable*/line-height:150% !important;
                }
        
        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Heading 2
            @tip Make the second-level headings larger in size for better
        readability on small screens.
            */
                h2{
                    /*@editable*/font-size:20px !important;
                    /*@editable*/line-height:150% !important;
                }
        
        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Heading 3
            @tip Make the third-level headings larger in size for better readability
        on small screens.
            */
                h3{
                    /*@editable*/font-size:18px !important;
                    /*@editable*/line-height:150% !important;
                }
        
        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Heading 4
            @tip Make the fourth-level headings larger in size for better
        readability on small screens.
            */
                h4{
                    /*@editable*/font-size:16px !important;
                    /*@editable*/line-height:150% !important;
                }
        
        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Boxed Text
            @tip Make the boxed text larger in size for better readability on small
        screens. We recommend a font size of at least 16px.
            */
                .mcnBoxedTextContentContainer
        .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
                    /*@editable*/font-size:16px !important;
                    /*@editable*/line-height:150% !important;
                }
        
        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Preheader Visibility
            @tip Set the visibility of the email's preheader on small screens. You
        can hide it to save space.
            */
                #templatePreheader{
                    /*@editable*/display:block !important;
                }
        
        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Preheader Text
            @tip Make the preheader text larger in size for better readability on
        small screens.
            */
                #templatePreheader .mcnTextContent,#templatePreheader
        .mcnTextContent p{
                    /*@editable*/font-size:12px !important;
                    /*@editable*/line-height:150% !important;
                }
        
        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Header Text
            @tip Make the header text larger in size for better readability on small
        screens.
            */
                #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
                    /*@editable*/font-size:16px !important;
                    /*@editable*/line-height:150% !important;
                }
        
        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Body Text
            @tip Make the body text larger in size for better readability on small
        screens. We recommend a font size of at least 16px.
            */
                #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
                    /*@editable*/font-size:16px !important;
                    /*@editable*/line-height:150% !important;
                }
        
        }   @media only screen and (max-width: 480px){
            /*
            @tab Mobile Styles
            @section Footer Text
            @tip Make the footer content text larger in size for better readability
        on small screens.
            */
                #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
                    /*@editable*/font-size:12px !important;
                    /*@editable*/line-height:150% !important;
                }
        
        }
        </style>
      </head>

      <body style="-ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
      background-color: #fed149; height: 100%; margin: 0; padding: 0; width: 100%">
        <center>
          <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" id="bodyTable" style="border-collapse: collapse; mso-table-lspace: 0;
      mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
      100%; background-color: #fed149; height: 100%; margin: 0; padding: 0; width:
      100%" width="100%">
            <tr>
              <td align="center" id="bodyCell" style="mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; border-top: 0;
      height: 100%; margin: 0; padding: 0; width: 100%" valign="top">
                <!-- BEGIN TEMPLATE // -->
                <!--[if gte mso 9]>
                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                      <tr>
                        <td align="center" valign="top" width="600" style="width:600px;">
                        <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" class="templateContainer" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; max-width:
      600px; border: 0" width="100%">
                  <tr>
                    <td id="templatePreheader" style="mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #fed149;
      border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 8px" valign="top">
                      <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0;
      mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
      min-width:100%;" width="100%">
                        <tbody class="mcnTextBlockOuter">
                          <tr>
                            <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                              <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
      mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
      100%; min-width:100%;" width="100%">
                                <tbody>
                                  <tr>
                                    <td class="mcnTextContent" style='mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
      color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 12px;
      line-height: 150%; text-align: left; padding-top:9px; padding-right: 18px;
      padding-bottom: 9px; padding-left: 18px;' valign="top">
                                      <a href="" style="mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #2a2a2a;
      font-weight: normal; text-decoration: none" target="_blank" title="Lingo is the
      best way to organize, share and use all your visual assets in one place -
      all on your desktop.">
                                        
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td id="templateHeader" style="mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f7f7ff;
      border-top: 0; border-bottom: 0; padding-top: 16px; padding-bottom: 0" valign="top">
                      <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
      min-width:100%;" width="100%">
                        <tbody class="mcnImageBlockOuter">
                          <tr>
                            <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                              <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
      mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
      100%; min-width:100%;" width="100%">
                                <tbody>
                                  <tr>
                                    <td class="mcnImageContent" style="mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-right: 0px;
      padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;" valign="top">
                                      <a class="" href="" style="mso-line-height-rule:
      exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color:
      #f57153; font-weight: normal; text-decoration: none" target="_blank" title="">
                                        <a class="" href="" style="mso-line-height-rule:
      exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color:
      #f57153; font-weight: normal; text-decoration: none" target="_blank" title="">
                                          <img align="center" alt="Forgot your password?" class="mcnImage" src="https://static.lingoapp.com/assets/images/email/il-password-reset@2x.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
      text-decoration: none; vertical-align: bottom; max-width:1200px; padding-bottom:
      0; display: inline !important; vertical-align: bottom;" width="600"></img>
                                        </a>
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td id="templateBody" style="mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #f7f7ff;
      border-top: 0; border-bottom: 0; padding-top: 0; padding-bottom: 0" valign="top">
                      <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                        <tbody class="mcnTextBlockOuter">
                          <tr>
                            <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                              <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
      mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
      100%; min-width:100%;" width="100%">
                                <tbody>
                                  <tr>
                                    <td class="mcnTextContent" style='mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
      color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;
      line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;
      padding-bottom: 9px; padding-left: 18px;' valign="top">

                                      <h1 class="null" style='color: #2a2a2a; font-family: "Asap", Helvetica,
      sans-serif; font-size: 32px; font-style: normal; font-weight: bold; line-height:
      125%; letter-spacing: 2px; text-align: center; display: block; margin: 0;
      padding: 0'><span style="text-transform:uppercase">Wanna Reset</span></h1>


                                      <h2 class="null" style='color: #2a2a2a; font-family: "Asap", Helvetica,
      sans-serif; font-size: 24px; font-style: normal; font-weight: bold; line-height:
      125%; letter-spacing: 1px; text-align: center; display: block; margin: 0;
      padding: 0'><span style="text-transform:uppercase">your password?</span></h2>

                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace:
      0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
      min-width:100%;" width="100%">
                        <tbody class="mcnTextBlockOuter">
                          <tr>
                            <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                              <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnTextContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
      mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
      100%; min-width:100%;" width="100%">
                                <tbody>
                                  <tr>
                                    <td class="mcnTextContent" style='mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; word-break: break-word;
      color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif; font-size: 16px;
      line-height: 150%; text-align: center; padding-top:9px; padding-right: 18px;
      padding-bottom: 9px; padding-left: 18px;' valign="top">Not to worry, we got you! Let’s get you a new password.
                                      <br></br>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock" style="border-collapse: collapse; mso-table-lspace: 0;
      mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
      min-width:100%;" width="100%">
                        <tbody class="mcnButtonBlockOuter">
                          <tr>
                            <td align="center" class="mcnButtonBlockInner" style="mso-line-height-rule:
      exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
      padding-top:18px; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top">
                              <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                                <tbody class="mcnButtonBlockOuter">
                                  <tr>
                                    <td align="center" class="mcnButtonBlockInner" style="mso-line-height-rule:
      exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
      padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" valign="top">
                                      <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
      mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
      border-collapse: separate !important;border-radius: 48px;background-color:
      #F57153;">
                                        <tbody>
                                          <tr>
                                            <td align="center" class="mcnButtonContent" style="mso-line-height-rule:
      exactly; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;
      font-family: 'Asap', Helvetica, sans-serif; font-size: 16px; padding-top:24px;
      padding-right:48px; padding-bottom:24px; padding-left:48px;" valign="middle">
                                            <a class="mcnButton" href="${resetUrl}" style="mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; display: block; color: #f57153;
      font-weight: normal; text-decoration: none; font-weight: normal;letter-spacing:
      1px;line-height: 100%;text-align: center;text-decoration: none;color:
      #FFFFFF; text-transform:uppercase;" target="_blank">Reset password</a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table border="0" cellpadding="0" cellspacing="0" class="mcnImageBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                        <tbody class="mcnImageBlockOuter">
                          <tr>
                            <td class="mcnImageBlockInner" style="mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding:0px" valign="top">
                              <table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="border-collapse: collapse; mso-table-lspace: 0;
      mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
      100%; min-width:100%;" width="100%">
                                <tbody>
                                  <tr>
                                    <td class="mcnImageContent" style="mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-right: 0px;
      padding-left: 0px; padding-top: 0; padding-bottom: 0; text-align:center;" valign="top"></td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td id="templateFooter" style="mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; background-color: #fed149;
      border-top: 0; border-bottom: 0; padding-top: 8px; padding-bottom: 80px" valign="top">
                      <table border="0" cellpadding="0" cellspacing="0" class="mcnTextBlock" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                        <tbody class="mcnTextBlockOuter">
                          <tr>
                            <td class="mcnTextBlockInner" style="mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%" valign="top">
                              <table align="center" bgcolor="#F7F7FF" border="0" cellpadding="32" cellspacing="0" class="card" style="border-collapse: collapse; mso-table-lspace: 0;
      mso-table-rspace: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust:
      100%; background:#F7F7FF; margin:auto; text-align:left; max-width:600px;
      font-family: 'Asap', Helvetica, sans-serif;" text-align="left" width="100%">
                                <tr>
                                  <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%">

                                    <h3 style='color: #2a2a2a; font-family: "Asap", Helvetica, sans-serif;
      font-size: 20px; font-style: normal; font-weight: normal; line-height: 125%;
      letter-spacing: normal; text-align: center; display: block; margin: 0; padding:
      0; text-align: left; width: 100%; font-size: 16px; font-weight: bold; '>Hi ${name} ,</h3>

                                    <p style='margin: 10px 0; padding: 0; mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #2a2a2a;
      font-family: "Asap", Helvetica, sans-serif; font-size: 12px; line-height: 150%;
      text-align: left; text-align: left; font-size: 14px; '>if you are not requested for this service just ignore this email 
                                    </p>
                                    <div style="padding-bottom: 18px;">
                                      <a href="${homeUrl}" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%; color: #f57153; font-weight: normal; text-decoration: none;
      font-size: 14px; color:#F57153; text-decoration:none;" target="_blank" title="Learn more about Lingo">Health Diet Online Search community</a>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; mso-table-lspace: 0; mso-table-rspace: 0;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; min-width:100%;" width="100%">
                                <tbody>
                                  <tr>
                                    <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%; padding-top: 24px; padding-right: 18px;
      padding-bottom: 24px; padding-left: 18px; color: #7F6925; font-family: 'Asap',
      Helvetica, sans-serif; font-size: 12px;" valign="top">
                                      <div style="text-align: center;">Made with
                                        <a  style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%; color: #f57153; font-weight: normal; text-decoration:
      none" target="_blank">
                                          <img align="none" alt="Heart icon" height="10" src="https://static.lingoapp.com/assets/images/email/made-with-heart.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
      text-decoration: none; width: 10px; height: 10px; margin: 0px;" width="10" />
                                        </a>by
                                      <a href="${homeUrl}" style="mso-line-height-rule: exactly;
      -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color: #f57153;
      font-weight: normal; text-decoration: none; color:#7F6925;" target="_blank" >Health Diet Online Search</a>community</div>
                                    </td>
                                  </tr>
                                  <tbody></tbody>
                                </tbody>
                              </table>
                              <table align="center" border="0" cellpadding="12" style="border-collapse:
      collapse; mso-table-lspace: 0; mso-table-rspace: 0; -ms-text-size-adjust:
      100%; -webkit-text-size-adjust: 100%; ">
                                <tbody>
                                  <tr>
                                    <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%">
                                      <a href="https://twitter.com" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%; color: #f57153; font-weight: normal; text-decoration: none" target="_blank">
                                        <img alt="twitter" height="32" src="https://static.lingoapp.com/assets/images/email/twitter-ic-32x32-email@2x.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none; text-decoration:
      none" width="32" />
                                      </a>
                                    </td>
                                    <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%">
                                      <a href="https://www.instagram.com/" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%; color: #f57153; font-weight: normal; text-decoration:
      none" target="_blank">
                                        <img alt="Instagram" height="32" src="https://static.lingoapp.com/assets/images/email/instagram-ic-32x32-email@2x.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
      text-decoration: none" width="32" />
                                      </a>
                                    </td>
                                    <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%">
                                      <a href="https://medium.com/@lingo_app" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%; color: #f57153; font-weight: normal; text-decoration: none" target="_blank">
                                        <img alt="medium" height="32" src="https://static.lingoapp.com/assets/images/email/medium-ic-32x32-email@2x.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none; text-decoration: none" width="32" />
                                      </a>
                                    </td>
                                    <td style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%">
                                      <a href="https://www.facebook.com/" style="mso-line-height-rule: exactly; -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%; color: #f57153; font-weight: normal; text-decoration: none" target="_blank">
                                        <img alt="facebook" height="32" src="https://static.lingoapp.com/assets/images/email/facebook-ic-32x32-email@2x.png" style="-ms-interpolation-mode: bicubic; border: 0; height: auto; outline: none;
      text-decoration: none" width="32" />
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </table>
                <!--[if gte mso 9]>
                        </td>
                      </tr>
                    </table>
                  <![endif]-->
                <!-- // END TEMPLATE -->
              </td>
            </tr>
          </table>
        </center> 
        </body>
      </html>

      `;
    }
    // Specify the fields in the email.
    let mailOptions = {
      from: senderAddress,
      to: toAddress,
      subject: subject,
      html: body_html,
    };
    await transporter.sendMail(mailOptions);
    return;
}

