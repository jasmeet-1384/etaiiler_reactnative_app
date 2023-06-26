import React from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput, useWindowDimensions, ScrollView } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import RenderHtml from 'react-native-render-html';


const source = {
    html: `
    <body style="background:#000;">
    <div style="background: #0000; height: auto !important;">
    <div class="container" style="height: auto !important;">
    <div>
    
    </div>
    <div class=" main-container" style="height: auto !important; min-height: 0px !important;">
    <h2 style="color:#fff">
                        
                            ii universe
                            
                        &gt; Terms of Use</h2>
    <hr>
    <div id="content" style="height: auto !important;"><p style="color:#fff" class="wysiwyg-text-align-center"><b>TERMS AND CONDITIONS</b></p>
    <p style="color:#fff">Last updated:&nbsp;2022-07-06</p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">1<span>.&nbsp;<b>Introduction</b></span></p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">Welcome to&nbsp;<b>WINNING9 MEDIA PRIVATE
    LIMITED</b>&nbsp;(“Company”,
    “we”, “our”, “us”)!</p>
    <p style="color:#fff"><span>These Terms of Service
    (“Terms”, “Terms of Service”) govern your use of our software Application <b>ii universe </b>located at Google Play
    Store&nbsp;(together or individually “Service”) operated by&nbsp;</span><b>WINNING9 MEDIA PRIVATE
    LIMITED</b>.</p>
    <p style="color:#fff">Our Privacy Policy
    also governs your use of our Service and explains how we collect, safeguard and
    disclose information that results from your use of our web pages.</p>
    <p style="color:#fff">Your agreement with us
    includes these Terms and our Privacy Policy (“Agreements”). You acknowledge
    that you have read and understood Agreements, and agree to be bound of them.</p>
    <p style="color:#fff">If you do not agree
    with (or cannot comply with) Agreements, then you may not use the Service, but
    please let us know by emailing at&nbsp;<b>support@iiuniverse.in</b>&nbsp;so we can try to find a solution. These
    Terms apply to all visitors, users and others who wish to access or use
    Service.</p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">2<span>.&nbsp;<b>Communications</b></span></p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">By using our Service,
    you agree to subscribe to newsletters, marketing or promotional materials and
    other information we may send. However, you may opt out of receiving any, or
    all, of these communications from us by following the unsubscribe link or by
    emailing at&nbsp;support@iiuniverse.in.</p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">3<span>.&nbsp;<b>Purchases</b></span></p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">If you wish to
    purchase any product or service made available through Service (“Purchase”),
    you may be asked to supply certain information relevant to your Purchase
    including but not limited to, your credit or debit card number, the expiration
    date of your card, your billing address, and your shipping information.</p>
    <p style="color:#fff">You represent and
    warrant that: (i) you have the legal right to use any card(s) or other payment
    method(s) in connection with any Purchase; and that (ii) the information you
    supply to us is true, correct and complete.</p>
    <p style="color:#fff">We may employ the use
    of third party services for the purpose of facilitating payment and the
    completion of Purchases. By submitting your information, you grant us the right
    to provide the information to these third parties subject to our Privacy
    Policy.</p>
    <p style="color:#fff">We reserve the right
    to refuse or cancel your order at any time for reasons including but not
    limited to: product or service availability, errors in the description or price
    of the product or service, error in your order or other reasons.</p>
    <p style="color:#fff">We reserve the right
    to refuse or cancel your order if fraud or an unauthorized or illegal
    transaction is suspected.</p>
    <p style="color:#fff">4<span>.&nbsp;<b>Contests,
    Sweepstakes and Promotions</b></span></p>
    <p style="color:#fff">Any contests,
    sweepstakes or other promotions (collectively, “Promotions”) made available
    through Service may be governed by rules that are separate from these Terms of
    Service. If you participate in any Promotions, please review the applicable
    rules as well as our Privacy Policy. If the rules for a Promotion conflict with
    these Terms of Service, Promotion rules will apply.</p>
    <p style="color:#fff">5<span>.&nbsp;<b>Refunds and
    cancellation</b></span></p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff"><span>5.1 &nbsp;You cannot cancel an order once payment is
    done.( Here order denotes to post uploaded by business profiles for promoting,
    sponsor his products, business or activities on <b>ii universe App</b>)</span></p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff"><span>5.2&nbsp; No replacement / refund / or any other
    resolution will be provided once the order is placed. .( Here order denotes to
    post uploaded by business profiles for promoting, sponsor his products,
    business or activities on <b>ii universe
    App</b>)</span></p>
    <p style="color:#fff"><span>5.3 &nbsp;You shall not be entitled to a refund in case
    instructions placed along with the order are not followed in the form and
    manner you had intended. Instructions are followed by the IT department of <b>ii universe</b> on a best efforts basis. .(
    Here order denotes to post uploaded by business profiles for promoting, sponsor
    his products, business or activities on <b>ii
    universe App</b>)</span></p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">5.4&nbsp; All refunds shall be processed in the same
    manner as they are received;&nbsp;&nbsp;&nbsp; </p>
    <p style="color:#fff">Refunds have been
    provided to you in the form of credits/voucher/refund amount will reflect in
    your account based on respective bank policies.</p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">6<span>.&nbsp;<b>Content</b></span></p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">Our Service allows you
    to post, link, store, share and otherwise make available certain information,
    text, graphics, videos, or other material (“Content”). You are responsible for
    Content that you post on or through Service, including its legality,
    reliability, and appropriateness.</p>
    <p style="color:#fff">By posting Content on
    or through Service, You represent and warrant that: (i) Content is yours (you
    own it) and/or you have the right to use it and the right to grant us the
    rights and license as provided in these Terms, and (ii) that the posting of
    your Content on or through Service does not violate the privacy rights,
    publicity rights, copyrights, contract rights or any other rights of any person
    or entity. We reserve the right to terminate the account of anyone found to be
    infringing on a copyright.</p>
    <p style="color:#fff">You retain any and all
    of your rights to any Content you submit, post or display on or through Service
    and you are responsible for protecting those rights. We take no responsibility
    and assume no liability for Content you or any third party posts on or through
    Service. However, by posting Content using Service you grant us the right and
    license to use, modify, publicly perform, publicly display, reproduce, and
    distribute such Content on and through Service. You agree that this license
    includes the right for us to make your Content available to other users of
    Service, who may also use your Content subject to these Terms.</p>
    <p>WINNING9 MEDIA PRIVATE LIMITED&nbsp;has the right but not the obligation to monitor and edit
    all Content provided by users.</p>
    <p style="color:#fff">In addition, Content
    found on or through this Service are the property of&nbsp;WINNING9 MEDIA PRIVATE
    LIMITED&nbsp;or used with
    permission. You may not distribute, modify, transmit, reuse, download, repost,
    copy, or use said Content, whether in whole or in part, for commercial purposes
    or for personal gain, without express advance written permission from us.</p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">7<span>.&nbsp;<b>Prohibited
    Uses</b></span></p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">You may use Service
    only for lawful purposes and in accordance with Terms. You agree not to use
    Service:</p>
    <p style="color:#fff">0.1. In any way that
    violates any applicable national or international law or regulation.</p>
    <p style="color:#fff">0.3. To transmit, or
    procure the sending of, any advertising or promotional material, including any
    “junk mail”, “chain letter,” “spam,” or any other similar solicitation.</p>
    <p style="color:#fff">0.4. To impersonate or
    attempt to impersonate Company, a Company employee, another user, or any other
    person or entity.</p>
    <p style="color:#fff">0.5. In any way that
    infringes upon the rights of others, or in any way is illegal, threatening,
    fraudulent, or harmful, or in connection with any unlawful, illegal,
    fraudulent, or harmful purpose or activity.</p>
    <p style="color:#fff">0.6. To engage in any
    other conduct that restricts or inhibits anyone's use or enjoyment of Service,
    or which, as determined by us, may harm or offend Company or users of Service
    or expose them to liability.</p>
    <p style="color:#fff">Additionally, you
    agree not to:</p>
    <p style="color:#fff">0.1. Use Service in
    any manner that could disable, overburden, damage, or impair Service or
    interfere with any other party's use of Service, including their ability to
    engage in real time activities through Service.</p>
    <p style="color:#fff">0.2. Use any robot,
    spider, or other automatic device, process, or means to access Service for any
    purpose, including monitoring or copying any of the material on Service.</p>
    <p style="color:#fff">0.3. Use any manual
    process to monitor or copy any of the material on Service or for any other
    unauthorized purpose without our prior written consent.</p>
    <p style="color:#fff">0.4. Use any device,
    software, or routine that interferes with the proper working of Service.</p>
    <p style="color:#fff">0.5. Introduce any
    viruses, trojan horses, worms, logic bombs, or other material which is
    malicious or technologically harmful.</p>
    <p style="color:#fff">0.6. Attempt to gain
    unauthorized access to, interfere with, damage, or disrupt any parts of
    Service, the server on which Service is stored, or any server, computer, or
    database connected to Service.</p>
    <p style="color:#fff">0.7. Attack Service
    via a denial-of-service attack or a distributed denial-of-service attack.</p>
    <p style="color:#fff">0.8. Take any action
    that may damage or falsify Company rating.</p>
    <p style="color:#fff">0.9. Otherwise attempt
    to interfere with the proper working of Service.</p>
    <p style="color:#fff">8<span>.&nbsp;<b>Analytics</b></span></p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">We may use third-party
    Service Providers to monitor and analyze the use of our Service.</p>
    <p style="color:#fff">9<span>.&nbsp;<b>Age </b></span></p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">Service is intended
    only for access and use by individuals at least eighteen (18) years old. By
    accessing or using Service, you warrant and represent that you are at least
    eighteen (18) years of age and with the full authority, right, and capacity to
    enter into this agreement and abide by all of the terms and conditions of
    Terms. If you are not at least eighteen (18) years old, you are prohibited from
    both the access and usage of Service.</p>
    <p style="color:#fff">10<span>.&nbsp;<b>Accounts</b></span></p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">When you create an
    account with us, you guarantee that you are above the age of 18, and that the
    information you provide us is accurate, complete, and current at all times.
    Inaccurate, incomplete, or obsolete information may result in the immediate
    termination of your account on Service.</p>
    <p style="color:#fff">You are responsible
    for maintaining the confidentiality of your account and password, including but
    not limited to the restriction of access to your computer and/or account. You
    agree to accept responsibility for any and all activities or actions that occur
    under your account and/or password, whether your password is with our Service
    or a third-party service. You must notify us immediately upon becoming aware of
    any breach of security or unauthorized use of your account.</p>
    <p style="color:#fff">You may not use as a
    username the name of another person or entity or that is not lawfully available
    for use, a name or trademark that is subject to any rights of another person or
    entity other than you, without appropriate authorization. You may not use as a
    username any name that is offensive, vulgar or obscene.</p>
    <p style="color:#fff">We reserve the right
    to refuse service, terminate accounts, remove or edit content, or cancel orders
    in our sole discretion.</p>
    <p style="color:#fff">11<span>.&nbsp;<b>Intellectual
    Property</b></span></p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">Service and its
    original content (excluding Content provided by users), features and
    functionality are and will remain the exclusive property of&nbsp;WINNING9 MEDIA PRIVATE
    LIMITED&nbsp;and its
    licensors. Service is protected by copyright, trademark, and other laws
    of&nbsp;and foreign countries. Our trademarks may not be used in connection
    with any product or service without the prior written consent of&nbsp;WINNING9 MEDIA PRIVATE
    LIMITED.</p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">12<span>.&nbsp;<b>Copyright
    Policy</b></span></p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">We respect the
    intellectual property rights of others. It is our policy to respond to any claim
    that Content posted on Service infringes on the copyright or other intellectual
    property rights (“Infringement”) of any person or entity.</p>
    <p style="color:#fff">If you are a copyright
    owner, or authorized on behalf of one, and you believe that the copyrighted
    work has been copied in a way that constitutes copyright infringement, please
    submit your claim via email to&nbsp;support@iiuniverse.in, with the subject line: “Copyright
    Infringement” and include in your claim a detailed description of the alleged
    Infringement as detailed below, under “DMCA Notice and Procedure for Copyright
    Infringement Claims”</p>
    <p style="color:#fff">You may be held
    accountable for damages (including costs and attorneys' fees) for
    misrepresentation or bad-faith claims on the infringement of any Content found
    on and/or through Service on your copyright.</p>
    <p style="color:#fff">13<span>.&nbsp;<b>DMCA Notice
    and Procedure for Copyright Infringement Claims</b></span></p>
    <p style="color:#fff">You may submit a
    notification pursuant to the Digital Millennium Copyright Act (DMCA) by
    providing our Copyright Agent with the following information in writing (see 17
    U.S.C 512(c)(3) for further detail):</p>
    <p style="color:#fff">0.1. an electronic or
    physical signature of the person authorized to act on behalf of the owner of
    the copyright's interest;</p>
    <p style="color:#fff">0.2. a description of
    the copyrighted work that you claim has been infringed, including the URL
    (i.e., web page address) of the location where the copyrighted work exists or a
    copy of the copyrighted work;</p>
    <p style="color:#fff">0.3. identification of
    the URL or other specific location on Service where the material that you claim
    is infringing is located;</p>
    <p style="color:#fff">0.4. your address,
    telephone number, and email address;</p>
    <p style="color:#fff">0.5. a statement by
    you that you have a good faith belief that the disputed use is not authorized
    by the copyright owner, its agent, or the law;</p>
    <p style="color:#fff">0.6. a statement by
    you, made under penalty of perjury, that the above information in your notice
    is accurate and that you are the copyright owner or authorized to act on the
    copyright owner's behalf.</p>
    <p style="color:#fff">You can contact our
    Copyright Agent via email at&nbsp;support@iiuniverse.in.</p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">14<span>.&nbsp;<b>Error
    Reporting and Feedback</b></span></p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">You may provide us
    either directly at&nbsp;support@iiuniverse.in&nbsp;or via third party sites and tools with information and
    feedback concerning errors, suggestions for improvements, ideas, problems,
    complaints, and other matters related to our Service (“Feedback”). You
    acknowledge and agree that: (i) you shall not retain, acquire or assert any
    intellectual property right or other right, title or interest in or to the
    Feedback; (ii) Company may have development ideas similar to the Feedback;
    (iii) Feedback does not contain confidential information or proprietary
    information from you or any third party; and (iv) Company is not under any
    obligation of confidentiality with respect to the Feedback. In the event the
    transfer of the ownership to the Feedback is not possible due to applicable
    mandatory laws, you grant Company and its affiliates an exclusive,
    transferable, irrevocable, free-of-charge, sub-licensable, unlimited and
    perpetual right to use (including copy, modify, create derivative works,
    publish, distribute and commercialize) Feedback in any manner and for any
    purpose.</p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">15<span>.&nbsp;<b>Links To
    Other Web Sites</b></span></p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">Our Service may
    contain links to third party web sites or services that are not owned or
    controlled by&nbsp;WINNING9 MEDIA PRIVATE LIMITED.</p>
    <p style="color:#fff">WINNING9 MEDIA PRIVATE LIMITED&nbsp;has no control over, and assumes no responsibility for the
    content, privacy policies, or practices of any third party web sites or
    services. We do not warrant the offerings of any of these entities/individuals
    or their websites.</p>
    <p style="color:#fff">For example, the
    outlined&nbsp;<a href="https://policymaker.io/terms-and-conditions/" rel="nofollow" target="_blank">Terms of Use</a>&nbsp;have been created using&nbsp;<a href="https://policymaker.io/" rel="nofollow" target="_blank">PolicyMaker.io</a>, a free web application for generating
    high-quality legal documents. PolicyMaker's&nbsp;<a href="https://policymaker.io/terms-and-conditions/" rel="nofollow" target="_blank">Terms and Conditions generator</a>&nbsp;is an easy-to-use free tool for creating
    an excellent standard Terms of Service template for a website, blog, e-commerce
    store or app.</p>
    <p style="color:#fff">YOU ACKNOWLEDGE AND
    AGREE THAT COMPANY SHALL NOT BE RESPONSIBLE OR LIABLE, DIRECTLY OR INDIRECTLY,
    FOR ANY DAMAGE OR LOSS CAUSED OR ALLEGED TO BE CAUSED BY OR IN CONNECTION WITH
    USE OF OR RELIANCE ON ANY SUCH CONTENT, GOODS OR SERVICES AVAILABLE ON OR
    THROUGH ANY SUCH THIRD PARTY WEB SITES OR SERVICES.</p>
    <p style="color:#fff">WE STRONGLY ADVISE YOU
    TO READ THE TERMS OF SERVICE AND PRIVACY POLICIES OF ANY THIRD PARTY WEB SITES
    OR SERVICES THAT YOU VISIT.</p>
    <p style="color:#fff">16<span>.&nbsp;<b>Disclaimer
    Of Warranty</b></span></p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">THESE SERVICES ARE
    PROVIDED BY COMPANY ON AN “AS IS” AND “AS AVAILABLE” BASIS. COMPANY MAKES NO
    REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE
    OPERATION OF THEIR SERVICES, OR THE INFORMATION, CONTENT OR MATERIALS INCLUDED
    THEREIN. YOU EXPRESSLY AGREE THAT YOUR USE OF THESE SERVICES, THEIR CONTENT,
    AND ANY SERVICES OR ITEMS OBTAINED FROM US IS AT YOUR SOLE RISK.</p>
    <p style="color:#fff">NEITHER COMPANY NOR
    ANY PERSON ASSOCIATED WITH COMPANY MAKES ANY WARRANTY OR REPRESENTATION WITH
    RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR
    AVAILABILITY OF THE SERVICES. WITHOUT LIMITING THE FOREGOING, NEITHER COMPANY
    NOR ANYONE ASSOCIATED WITH COMPANY REPRESENTS OR WARRANTS THAT THE SERVICES,
    THEIR CONTENT, OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES WILL BE
    ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS WILL BE
    CORRECTED, THAT THE SERVICES OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF
    VIRUSES OR OTHER HARMFUL COMPONENTS OR THAT THE SERVICES OR ANY SERVICES OR ITEMS
    OBTAINED THROUGH THE SERVICES WILL OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS.</p>
    <p style="color:#fff">COMPANY HEREBY
    DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY, OR
    OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY,
    NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.</p>
    <p style="color:#fff">THE FOREGOING DOES NOT
    AFFECT ANY WARRANTIES WHICH CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.</p>
    <p style="color:#fff">17<span>.&nbsp;<b>Limitation
    Of Liability</b></span></p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">EXCEPT AS PROHIBITED
    BY LAW, YOU WILL HOLD US AND OUR OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS
    HARMLESS FOR ANY INDIRECT, PUNITIVE, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL
    DAMAGE, HOWEVER IT ARISES (INCLUDING ATTORNEYS' FEES AND ALL RELATED COSTS AND
    EXPENSES OF LITIGATION AND ARBITRATION, OR AT TRIAL OR ON APPEAL, IF ANY, WHETHER
    OR NOT LITIGATION OR ARBITRATION IS INSTITUTED), WHETHER IN AN ACTION OF
    CONTRACT, NEGLIGENCE, OR OTHER TORTIOUS ACTION, OR ARISING OUT OF OR IN
    CONNECTION WITH THIS AGREEMENT, INCLUDING WITHOUT LIMITATION ANY CLAIM FOR
    PERSONAL INJURY OR PROPERTY DAMAGE, ARISING FROM THIS AGREEMENT AND ANY
    VIOLATION BY YOU OF ANY FEDERAL, STATE, OR LOCAL LAWS, STATUTES, RULES, OR
    REGULATIONS, EVEN IF COMPANY HAS BEEN PREVIOUSLY ADVISED OF THE POSSIBILITY OF
    SUCH DAMAGE. EXCEPT AS PROHIBITED BY LAW, IF THERE IS LIABILITY FOUND ON THE
    PART OF COMPANY, IT WILL BE LIMITED TO THE AMOUNT PAID FOR THE PRODUCTS AND/OR
    SERVICES, AND UNDER NO CIRCUMSTANCES WILL THERE BE CONSEQUENTIAL OR PUNITIVE
    DAMAGES. SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF PUNITIVE,
    INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE PRIOR LIMITATION OR EXCLUSION MAY
    NOT APPLY TO YOU.</p>
    <p style="color:#fff">18<span>.&nbsp;<b>Termination</b></span></p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">We may terminate or
    suspend your account and bar access to Service immediately, without prior
    notice or liability, under our sole discretion, for any reason whatsoever and
    without limitation, including but not limited to a breach of Terms.</p>
    <p style="color:#fff">If you wish to
    terminate your account, you may simply discontinue using Service.</p>
    <p style="color:#fff">All provisions of
    Terms which by their nature should survive termination shall survive termination,
    including, without limitation, ownership provisions, warranty disclaimers,
    indemnity and limitations of liability.</p>
    <p style="color:#fff">19<span>.&nbsp;<b>Governing
    Law</b></span></p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">These Terms shall be
    governed and construed in accordance with the laws of&nbsp;India, which governing law applies to agreement
    without regard to its conflict of law provisions.</p>
    <p style="color:#fff">Our failure to enforce
    any right or provision of these Terms will not be considered a waiver of those
    rights. If any provision of these Terms is held to be invalid or unenforceable
    by a court, the remaining provisions of these Terms will remain in effect.
    These Terms constitute the entire agreement between us regarding our Service
    and supersede and replace any prior agreements we might have had between us
    regarding Service.</p>
    <p style="color:#fff">20<span>.&nbsp;<b>Changes To
    Service</b></span></p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">We reserve the right
    to withdraw or amend our Service, and any service or material we provide via
    Service, in our sole discretion without notice. We will not be liable if for
    any reason all or any part of Service is unavailable at any time or for any period.
    From time to time, we may restrict access to some parts of Service, or the
    entire Service, to users, including registered users.</p>
    <p style="color:#fff">21<span>.&nbsp;<b>Amendments
    To Terms</b></span></p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">We may amend Terms at
    any time by posting the amended terms on this site. It is your responsibility
    to review these Terms periodically.</p>
    <p style="color:#fff">Your continued use of
    the Platform following the posting of revised Terms means that you accept and
    agree to the changes. You are expected to check this page frequently so you are
    aware of any changes, as they are binding on you.</p>
    <p style="color:#fff">By continuing to
    access or use our Service after any revisions become effective, you agree to be
    bound by the revised terms. If you do not agree to the new terms, you are no
    longer authorized to use Service.</p>
    <p style="color:#fff">22<span>.&nbsp;<b>Waiver And
    Severability</b></span></p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">No waiver by Company
    of any term or condition set forth in Terms shall be deemed a further or
    continuing waiver of such term or condition or a waiver of any other term or
    condition, and any failure of Company to assert a right or provision under
    Terms shall not constitute a waiver of such right or provision.</p>
    <p style="color:#fff">If any provision of
    Terms is held by a court or other tribunal of competent jurisdiction to be
    invalid, illegal or unenforceable for any reason, such provision shall be
    eliminated or limited to the minimum extent such that the remaining provisions
    of Terms will continue in full force and effect.</p>
    <p style="color:#fff">23. <b>Advertising</b></p>
    <p style="color:#fff"><b>&nbsp;</b></p>
    <p style="color:#fff">23.1 &nbsp;<span>Some of
    the Services are supported by advertising revenue and may display
    advertisements and promotions. These advertisements may be targeted to the
    content of information stored on the Services, queries made through the
    Services or other information. The manner, mode and extent of advertising by <b>ii universe</b> on the Services are subject
    to change without specific notice to you. In consideration for <b>ii universe </b>granting you access to and
    use of the Services, you agree that <b>ii
    universe</b> may place such advertising on the Services.</span></p>
    <p style="color:#fff"><span>23.2&nbsp; Part of the site may
    contain advertising information or promotional material or other material
    submitted to <b>ii universe</b> by third
    parties or Customers. Responsibility for ensuring that material submitted for
    inclusion on the <b>ii universe</b>
    Platform or mobile apps complies with applicable international and national law
    is exclusively on the party providing the information/material. Your
    correspondence or business dealings with, or participation in promotions of,
    advertisers other than <b>ii universe</b>
    found on or through the <b>ii universe</b>
    Platform and or mobile apps, including payment and delivery of related goods or
    services, and any other terms, conditions, warranties or representations
    associated with such dealings, shall be solely between you and such advertiser.
    <b>ii universe</b> will not be responsible
    or liable for any error or omission, inaccuracy in advertising material or any
    loss or damage of any sort incurred as a result of any such dealings or as a
    result of the presence of such other advertiser(s) on the <b>ii universe</b> Platform and mobile application.</span></p>
    <p style="color:#fff">24<span>.&nbsp;<b>Acknowledgement</b></span></p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">BY USING SERVICE OR
    OTHER SERVICES PROVIDED BY US, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS
    OF SERVICE AND AGREE TO BE BOUND BY THEM.</p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">. </p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">25<span>.&nbsp;<b>Contact Us</b></span></p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">Please send your
    feedback, comments, requests for technical support by email:&nbsp;<a rel="nofollow" target="_blank"><b>support@iiuniverse.in</b></a>.</p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff"><b>Details of the company</b><b></b></p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">·&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <b>Legal Entity Name:</b> Winning9 Media Private Limited</p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">·&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <b>CIN:</b> U74999OR2022PTC039209</p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">·&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <b>Registered Address:</b> LIG
    S2/789 BDA 1st, Phase 2 Niladri Vihar C.S.Pur Bhubaneswar, Odisha,
    PIN-751021</p>
    <p style="color:#fff">&nbsp;</p>
    <p>·&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    Contact Details<b>: </b><a rel="nofollow" target="_blank"><b>support@iiuniverse.in</b></a>.</p>
    <p style="color:#fff">&nbsp;</p>
    <p style="color:#fff">These&nbsp;<a href="https://policymaker.io/terms-and-conditions/" rel="nofollow" target="_blank">Terms of Service</a>&nbsp;were created for&nbsp;<b>ii&nbsp;
    universe App </b>by&nbsp;<a href="https://policymaker.io/" rel="nofollow" target="_blank">PolicyMaker.io</a>&nbsp;on&nbsp;2022-07-06.</p>
    <p style="color:#fff">&nbsp;</p><br></div>
    </div>
    </div>
    </div>
    <footer><footer>
    <div class="container">
    <div class="row">
    <div class="col-xs-12 col-md-6" style="text-align:left;margin:auto;vertical-align:middle;">
    <div class="social-icons">
    </div>
    <div id="attribution">
    <!-- <p><a href="/">Homepage</a></p> -->
    <p>App <a href="privacy.html">Privacy Policy</a></p>
    <p>App <a href="terms.html">Terms &amp; Conditions</a></p>
    <p>This site is protected by reCAPTCHA and the Google
                            <a href="https://policies.google.com/privacy">Privacy Policy</a> and
                            <a href="https://policies.google.com/terms">Terms of Service</a> apply.
                        </p>
    <p>
                            This website is hosted by
                            <a href="https://www.flycricket.com">Flycricket</a>
    </p>
    <p>Flycricket <a href="https://flycricket.com/privacy.html">Privacy Policy</a>, <a href="https://flycricket.com/cookie_policy.html">Cookie Policy</a>, &amp; <a href="https://flycricket.com/terms.html">Terms of Use</a></p>
    </div>
    </div>
    <div class="col-xs-12 col-md-6 footer-store-button-container">
    </div>
    </div>
    </div>
    </footer></footer>
    
    </body>`
};

export default TermsAndConditionScreen = () => {
    const { width } = useWindowDimensions()
    return (
        <View style={{ backgroundColor: 'black', height: heightToDp('100%'), padding: 20 }}>
            <ScrollView>
                <RenderHtml
                    contentWidth={width}
                    source={source}
                />
            </ScrollView>
        </View>
    )
}