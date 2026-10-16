// Legal pages of EN/DE/ES — faithful translations of the UA privacy policy, cookie policy and terms
// of use (src/pages/privacy-policy.astro, cookies-policy.astro, terms.astro). The legal content is not
// changed; only the language. Trusted HTML written in this repository.
import { intlHref, type IntlLocale } from '../../../i18n/intl-routes';
import type { LegalCopy } from './types';

const mail = '<a href="mailto:info@space-glass.com.ua">info@space-glass.com.ua</a>';

export const legalCopy: Record<IntlLocale, Record<string, LegalCopy>> = {
  en: {
    privacy: {
      title: 'Privacy policy',
      description: 'Space Glass privacy policy: which personal data we receive, why we use it, how we protect it and what rights you have as a user.',
      updated: '30 August 2026',
      html: `<p>This Privacy Policy explains which personal data Space Glass may receive when you use the website and send requests and enquiries, for what purposes we use it and what rights you have.</p>
<h2>1. Who processes personal data</h2>
<p>Personal data received through the Space Glass website is processed by Space Glass to the extent necessary to handle enquiries, prepare quotations, fulfil orders and serve customers.</p>
<p>For questions about personal data and this Policy, please contact us at ${mail}.</p>
<h2>2. What data we may receive</h2>
<p>Depending on how you contact us, we may receive:</p>
<ul>
<li>your name and contact details;</li>
<li>your phone number and e-mail address;</li>
<li>the city or place where the project is located;</li>
<li>information about the product, structure or service you need;</li>
<li>selected parameters and configuration of a product;</li>
<li>comments and other information you include in your request;</li>
<li>photos, drawings, documents and other files you send voluntarily for a quote or consultation;</li>
<li>technical data about the use of the website, if permitted cookies or web analytics are used for this.</li>
</ul>
<p>We may also receive materials you send voluntarily to prepare a proposal or carry out a project: photos of the site, drawings, diagrams, technical specifications, project documentation and other files. In the case of a job application, this may also include a CV and the information you have voluntarily provided in it.</p>
<h2>3. Data from forms on the website</h2>
<p>The website may use contact forms, order forms, forms for a preliminary quote, configurators and other request forms.</p>
<p>The data you enter in such a form is used to handle that specific enquiry: to contact you, clarify the parameters, prepare a quote or a commercial proposal and, if necessary, organise the fulfilment of the order.</p>
<h2>4. What we use the data for</h2>
<p>Personal data may be used to:</p>
<ul>
<li>respond to your enquiry;</li>
<li>prepare a preliminary or exact quote;</li>
<li>advise you on products, materials and technical solutions;</li>
<li>prepare a commercial proposal;</li>
<li>arrange the site survey, production, delivery and installation;</li>
<li>conclude and perform a contract or order;</li>
<li>provide service and warranty support;</li>
<li>ensure the operation and security of the website and improve it;</li>
<li>comply with legal requirements.</li>
</ul>
<p>If you contact us about employment, data from your CV and messages may be used to consider your application, contact you and organise the recruitment process. A CV is kept for possible future vacancies only where there is an appropriate legal basis or the candidate’s consent.</p>
<h2>5. Legal bases for processing</h2>
<p>Depending on the situation, data is processed on the basis of your voluntary consent, the need to take steps at your request before entering into a contract, the need to perform a contract, the legitimate interests of Space Glass or the fulfilment of obligations provided for by law.</p>
<p>If a form contains a mandatory confirmation of consent to the Privacy Policy, the request can only be sent after this confirmation.</p>
<h2>6. CRM and handling of requests</h2>
<p>To organise enquiries and work with customers, data from requests may be transferred to a CRM system and used by authorised Space Glass employees to handle the enquiry.</p>
<p>Access to such data is granted only to the extent necessary for the relevant work functions.</p>
<h2>7. Phone, e-mail and messengers</h2>
<p>If you leave a phone number or e-mail address or contact Space Glass yourself via Telegram or another available channel, these contact details and the content of the correspondence may be used to respond to your enquiry and for further communication about the project or order.</p>
<p>When a third-party messenger is used, part of the data may also be processed by the provider of that service in accordance with its own terms and privacy policy.</p>
<h2>8. Cookies and analytics</h2>
<p>The website may use technically necessary cookies and — where there is an appropriate legal basis or your consent — analytics tools to understand how visitors use the website.</p>
<p>More information on the use of cookies can be found in the <a href="${intlHref('cookies', 'en')}">Cookie policy</a>.</p>
<h2>9. Disclosure of data to third parties</h2>
<p>Space Glass does not sell users’ personal data.</p>
<p>To operate the website and handle enquiries, providers of CRM, hosting, e-mail, IT services, analytics and other contractors may receive access to certain data where this is necessary to provide the relevant service.</p>
<p>Data may also be disclosed where required by law or by a competent public authority, or where necessary to protect legitimate rights and interests.</p>
<p>Providers of hosting and technical infrastructure, CRM systems, analytics, e-mail, telephony, messengers and file storage services may be involved in operating the website and handling enquiries, as well as contractors who need the relevant information to carry out a specific order or project. Only the data necessary for the relevant function is transferred.</p>
<h2>10. Retention period</h2>
<p>Personal data is stored only for as long as is necessary for the purpose for which it was received, for further work on the enquiry or with the customer, for the performance of a contract, warranty obligations or legal requirements.</p>
<p>Once the relevant purpose no longer applies, the data is deleted, anonymised or kept only where further storage is required by law.</p>
<h2>11. Protection of personal data</h2>
<p>We apply reasonable organisational and technical measures to protect personal data against unauthorised access, loss, alteration, disclosure or misuse.</p>
<p>Please do not send passwords, full payment details or other data that is not needed to handle your enquiry through the website forms.</p>
<h2>12. Your rights</h2>
<p>In the cases and to the extent provided for by applicable law, you may:</p>
<ul>
<li>obtain information about the processing of your personal data;</li>
<li>request access to it;</li>
<li>request the correction of inaccurate or incomplete data;</li>
<li>request the deletion of data if there is no legal basis for further processing;</li>
<li>request the restriction of processing in the cases provided for by law;</li>
<li>object to certain types of processing;</li>
<li>withdraw consent you have given, where processing is based on consent;</li>
<li>lodge a complaint with the competent data protection authority.</li>
</ul>
<h2>13. How to withdraw consent or submit a request</h2>
<p>To withdraw your consent or to clarify, correct or delete your personal data, send a request to ${mail}. To protect your data, we may ask for information needed to verify the identity of the applicant.</p>
<h2>14. Changes to this Policy</h2>
<p>We may update this Policy if the functionality of the website, the ways in which data is processed or legal requirements change. The current version is always published on this page.</p>`
    },
    cookies: {
      title: 'Cookie policy',
      description: 'Space Glass cookie policy: which files the website uses, why they are needed, how analytics works and how to change or withdraw your consent.',
      updated: '30 August 2026',
      html: `<h2>What cookies are</h2><p>Cookies are small records in your browser that help save your choices and make the website work correctly.</p>
<h2>Necessary cookies</h2><p>They store your consent settings, a draft estimate and the contents of your project. Without them some configurator functions may not work.</p>
<h2>Analytics and advertising technologies</h2><p>Google Analytics 4 and Meta Pixel are loaded only after your consent and only once production identifiers are set up. They help us assess how pages and campaigns perform.</p>
<h2>How to change your choice</h2><p>Delete the <code>sg-cookie-consent</code> entry in your browser’s site data settings, reload the page and choose again. Your browser also lets you block or delete cookies.</p>`
    },
    terms: {
      title: 'Terms of use',
      description: 'Space Glass terms of use: rules for the website and configurator, preliminary quotes, rights to materials, user responsibility and contacts.',
      updated: '30 August 2026',
      html: `<h2>1. General provisions</h2><p>By using the website you agree to these terms. The materials on the website are for information purposes and may be updated without notice.</p>
<h2>2. Quotes and proposals</h2><p>Configurator prices and automatically generated proposals are preliminary and do not constitute a public offer. The final price, lead time, specification and warranty are set out in the contract after the site survey and technical check.</p>
<h2>3. Intellectual property</h2><p>Texts, photos, drawings, design and trade marks belong to Space Glass or are used lawfully. Copying for commercial purposes requires written consent.</p>
<h2>4. Liability</h2><p>We strive for accuracy and uninterrupted operation but do not guarantee the absence of temporary technical failures. The user is responsible for the accuracy of the dimensions and contact details provided.</p>
<h2>5. Contact</h2><p>Questions about these terms: ${mail}, <a href="tel:+380734251400">+380 73 425 14 00</a>.</p>`
    }
  },
  de: {
    privacy: {
      title: 'Datenschutzerklärung',
      description: 'Datenschutzerklärung von Space Glass: welche personenbezogenen Daten wir erhalten, wofür wir sie nutzen, wie wir sie schützen und welche Rechte Sie haben.',
      updated: '30. August 2026',
      html: `<p>Diese Datenschutzerklärung erläutert, welche personenbezogenen Daten Space Glass bei der Nutzung der Website sowie beim Senden von Anfragen und Mitteilungen erhalten kann, zu welchen Zwecken wir sie verwenden und welche Rechte Sie haben.</p>
<h2>1. Wer personenbezogene Daten verarbeitet</h2>
<p>Die über die Website von Space Glass erhaltenen personenbezogenen Daten verarbeitet Space Glass in dem Umfang, der für die Bearbeitung von Anfragen, die Erstellung von Angeboten, die Ausführung von Aufträgen und die Kundenbetreuung erforderlich ist.</p>
<p>Bei Fragen zu personenbezogenen Daten und zu dieser Erklärung erreichen Sie uns unter ${mail}.</p>
<h2>2. Welche Daten wir erhalten können</h2>
<p>Je nach Art der Kontaktaufnahme können wir Folgendes erhalten:</p>
<ul>
<li>Name und Kontaktdaten;</li>
<li>Telefonnummer und E-Mail-Adresse;</li>
<li>Ort oder Standort des Projekts;</li>
<li>Angaben zum gewünschten Produkt, zur Konstruktion oder Leistung;</li>
<li>gewählte Parameter und Konfiguration eines Produkts;</li>
<li>Kommentare und sonstige Angaben, die Sie in Ihrer Anfrage machen;</li>
<li>Fotos, Zeichnungen, Dokumente und andere Dateien, die Sie freiwillig für eine Kostenschätzung oder Beratung senden;</li>
<li>technische Daten zur Nutzung der Website, sofern hierfür zulässige Cookies oder Webanalyse eingesetzt werden.</li>
</ul>
<p>Außerdem können wir Unterlagen erhalten, die Sie freiwillig zur Erstellung eines Angebots oder zur Umsetzung eines Projekts senden: Fotos des Objekts, Zeichnungen, Skizzen, Leistungsbeschreibungen, Projektunterlagen und andere Dateien. Bei einer Bewerbung kann dies auch ein Lebenslauf und die darin freiwillig gemachten Angaben sein.</p>
<h2>3. Daten aus Formularen auf der Website</h2>
<p>Auf der Website können Kontakt-, Bestell- und Anfrageformulare für eine Kostenschätzung, Konfiguratoren und andere Anfrageformulare verwendet werden.</p>
<p>Die Daten, die Sie in ein solches Formular eingeben, werden zur Bearbeitung der konkreten Anfrage verwendet: um Sie zu kontaktieren, Parameter zu klären, eine Kostenschätzung oder ein Angebot zu erstellen und bei Bedarf die Ausführung des Auftrags zu organisieren.</p>
<h2>4. Wofür wir die Daten verwenden</h2>
<p>Personenbezogene Daten können verwendet werden, um:</p>
<ul>
<li>Ihre Anfrage zu beantworten;</li>
<li>eine vorläufige oder genaue Kostenschätzung zu erstellen;</li>
<li>Sie zu Produkten, Materialien und technischen Lösungen zu beraten;</li>
<li>ein Angebot zu erstellen;</li>
<li>Aufmaß, Fertigung, Lieferung und Montage abzustimmen;</li>
<li>einen Vertrag oder Auftrag abzuschließen und zu erfüllen;</li>
<li>Service- und Garantieleistungen zu erbringen;</li>
<li>den Betrieb und die Sicherheit der Website zu gewährleisten und sie zu verbessern;</li>
<li>gesetzliche Pflichten zu erfüllen.</li>
</ul>
<p>Wenn Sie sich bei uns bewerben, können Daten aus Lebenslauf und Nachrichten zur Prüfung der Bewerbung, zur Kontaktaufnahme und zur Organisation des Einstellungsverfahrens verwendet werden. Ein Lebenslauf wird für mögliche künftige Stellen nur aufbewahrt, wenn eine entsprechende Rechtsgrundlage oder die Einwilligung der Person vorliegt.</p>
<h2>5. Rechtsgrundlagen der Verarbeitung</h2>
<p>Je nach Situation werden Daten auf Grundlage Ihrer freiwilligen Einwilligung, zur Durchführung vorvertraglicher Maßnahmen auf Ihre Anfrage, zur Vertragserfüllung, aufgrund berechtigter Interessen von Space Glass oder zur Erfüllung gesetzlicher Pflichten verarbeitet.</p>
<p>Enthält ein Formular eine verpflichtende Bestätigung der Einwilligung in die Datenschutzerklärung, kann die Anfrage erst nach dieser Bestätigung gesendet werden.</p>
<h2>6. CRM und Bearbeitung von Anfragen</h2>
<p>Zur Organisation der Anfragen und der Kundenbetreuung können Daten aus Anfragen an ein CRM-System übermittelt und von berechtigten Mitarbeitenden von Space Glass zur weiteren Bearbeitung verwendet werden.</p>
<p>Der Zugriff auf diese Daten wird nur in dem Umfang gewährt, der für die jeweiligen Aufgaben erforderlich ist.</p>
<h2>7. Telefon, E-Mail und Messenger</h2>
<p>Wenn Sie eine Telefonnummer oder E-Mail-Adresse hinterlassen oder sich selbst über Telegram oder einen anderen verfügbaren Kanal an Space Glass wenden, können diese Kontaktdaten und der Inhalt der Korrespondenz zur Beantwortung Ihrer Anfrage und zur weiteren Kommunikation über das Projekt oder den Auftrag verwendet werden.</p>
<p>Bei Nutzung eines Messengers eines Drittanbieters kann ein Teil der Daten auch vom jeweiligen Anbieter nach dessen eigenen Bedingungen und Datenschutzbestimmungen verarbeitet werden.</p>
<h2>8. Cookies und Analyse</h2>
<p>Die Website kann technisch notwendige Cookies und — bei Vorliegen einer entsprechenden Rechtsgrundlage oder Ihrer Einwilligung — Analysewerkzeuge einsetzen, um zu verstehen, wie Besucher die Website nutzen.</p>
<p>Ausführliche Informationen zum Einsatz von Cookies finden Sie in der <a href="${intlHref('cookies', 'de')}">Cookie-Richtlinie</a>.</p>
<h2>9. Weitergabe von Daten an Dritte</h2>
<p>Space Glass verkauft keine personenbezogenen Daten.</p>
<p>Für den Betrieb der Website und die Bearbeitung von Anfragen können Anbieter von CRM, Hosting, E-Mail, IT-Diensten, Analyse und andere Auftragnehmer Zugriff auf einzelne Daten erhalten, wenn dies für die Erbringung der jeweiligen Leistung erforderlich ist.</p>
<p>Daten können außerdem weitergegeben werden, wenn dies gesetzlich vorgeschrieben ist, eine zuständige Behörde es verlangt oder es zum Schutz berechtigter Rechte und Interessen erforderlich ist.</p>
<p>Für den Betrieb der Website und die Bearbeitung von Anfragen können Anbieter von Hosting und technischer Infrastruktur, CRM-Systemen, Analyse, E-Mail, Telefonie, Messengern und Dateispeicherdiensten sowie Auftragnehmer eingebunden werden, die die Informationen zur Ausführung eines konkreten Auftrags oder Projekts benötigen. Übermittelt wird nur der für die jeweilige Funktion erforderliche Datenumfang.</p>
<h2>10. Speicherdauer</h2>
<p>Personenbezogene Daten werden nur so lange gespeichert, wie es für den Zweck ihrer Erhebung, die weitere Bearbeitung der Anfrage oder Kundenbeziehung, die Vertragserfüllung, Garantiepflichten oder gesetzliche Vorgaben erforderlich ist.</p>
<p>Entfällt der jeweilige Zweck, werden die Daten gelöscht, anonymisiert oder nur gespeichert, wenn eine weitere Aufbewahrung gesetzlich vorgeschrieben ist.</p>
<h2>11. Schutz personenbezogener Daten</h2>
<p>Wir treffen angemessene organisatorische und technische Maßnahmen, um personenbezogene Daten vor unbefugtem Zugriff, Verlust, Veränderung, Offenlegung oder Missbrauch zu schützen.</p>
<p>Bitte senden Sie über die Formulare der Website keine Passwörter, vollständigen Zahlungsdaten oder andere Daten, die für die Bearbeitung Ihrer Anfrage nicht erforderlich sind.</p>
<h2>12. Ihre Rechte</h2>
<p>In den Fällen und in dem Umfang, die das anwendbare Recht vorsieht, können Sie:</p>
<ul>
<li>Auskunft über die Verarbeitung Ihrer personenbezogenen Daten erhalten;</li>
<li>Zugang zu ihnen verlangen;</li>
<li>die Berichtigung unrichtiger oder unvollständiger Daten verlangen;</li>
<li>die Löschung von Daten verlangen, wenn für ihre weitere Verarbeitung keine Rechtsgrundlage besteht;</li>
<li>in den gesetzlich vorgesehenen Fällen die Einschränkung der Verarbeitung verlangen;</li>
<li>bestimmten Arten der Verarbeitung widersprechen;</li>
<li>eine erteilte Einwilligung widerrufen, wenn die Verarbeitung auf einer Einwilligung beruht;</li>
<li>sich an die zuständige Datenschutzaufsichtsbehörde wenden.</li>
</ul>
<h2>13. Widerruf der Einwilligung und Anfragen</h2>
<p>Um Ihre Einwilligung zu widerrufen oder Ihre personenbezogenen Daten zu präzisieren, zu berichtigen oder zu löschen, senden Sie eine Anfrage an ${mail}. Zum Schutz der Daten können wir Angaben anfordern, die zur Bestätigung der Identität erforderlich sind.</p>
<h2>14. Änderungen dieser Erklärung</h2>
<p>Wir können diese Erklärung aktualisieren, wenn sich die Funktionen der Website, die Art der Datenverarbeitung oder gesetzliche Anforderungen ändern. Die aktuelle Fassung wird stets auf dieser Seite veröffentlicht.</p>`
    },
    cookies: {
      title: 'Cookie-Richtlinie',
      description: 'Cookie-Richtlinie von Space Glass: welche Dateien die Website nutzt, wozu sie dienen, wie die Analyse funktioniert und wie Sie die Einwilligung ändern.',
      updated: '30. August 2026',
      html: `<h2>Was Cookies sind</h2><p>Cookies sind kleine Einträge im Browser, die Ihre Auswahl speichern und für eine korrekte Funktion der Website sorgen.</p>
<h2>Notwendige Cookies</h2><p>Sie speichern Ihre Einwilligungseinstellungen, einen Kostenentwurf und den Inhalt Ihres Projekts. Ohne sie funktionieren einzelne Funktionen des Konfigurators unter Umständen nicht.</p>
<h2>Analyse- und Werbetechnologien</h2><p>Google Analytics 4 und Meta Pixel werden erst nach Ihrer Einwilligung und erst nach Einrichtung der Produktions-IDs geladen. Sie helfen uns, die Wirkung von Seiten und Kampagnen zu bewerten.</p>
<h2>So ändern Sie Ihre Auswahl</h2><p>Löschen Sie den Eintrag <code>sg-cookie-consent</code> in den Website-Daten Ihres Browsers, laden Sie die Seite neu und wählen Sie erneut. Ihr Browser ermöglicht es außerdem, Cookies zu blockieren oder zu löschen.</p>`
    },
    terms: {
      title: 'Nutzungsbedingungen',
      description: 'Nutzungsbedingungen von Space Glass: Regeln für Website und Konfigurator, vorläufige Kostenschätzungen, Rechte an Inhalten, Verantwortung und Kontakt.',
      updated: '30. August 2026',
      html: `<h2>1. Allgemeines</h2><p>Mit der Nutzung der Website erklären Sie sich mit diesen Bedingungen einverstanden. Die Inhalte der Website dienen der Information und können ohne Vorankündigung aktualisiert werden.</p>
<h2>2. Kostenschätzungen und Angebote</h2><p>Preise des Konfigurators und automatisch erstellte Angebote sind vorläufig und stellen kein verbindliches Angebot dar. Endpreis, Lieferzeit, Ausführung und Garantie werden nach Aufmaß und technischer Prüfung im Vertrag festgelegt.</p>
<h2>3. Geistiges Eigentum</h2><p>Texte, Fotos, Zeichnungen, Design und Marken gehören Space Glass oder werden rechtmäßig verwendet. Eine Vervielfältigung zu kommerziellen Zwecken bedarf der schriftlichen Zustimmung.</p>
<h2>4. Haftung</h2><p>Wir bemühen uns um Richtigkeit und einen störungsfreien Betrieb, können vorübergehende technische Ausfälle jedoch nicht ausschließen. Die Nutzerin bzw. der Nutzer ist für die Richtigkeit der angegebenen Maße und Kontaktdaten verantwortlich.</p>
<h2>5. Kontakt</h2><p>Fragen zu diesen Bedingungen: ${mail}, <a href="tel:+380734251400">+380 73 425 14 00</a>.</p>`
    }
  },
  es: {
    privacy: {
      title: 'Política de privacidad',
      description: 'Política de privacidad de Space Glass: qué datos personales recibimos, para qué los usamos, cómo los protegemos y qué derechos tiene como usuario.',
      updated: '30 de agosto de 2026',
      html: `<p>Esta Política de privacidad explica qué datos personales puede recibir Space Glass cuando usted utiliza el sitio web y envía solicitudes y consultas, para qué fines los utilizamos y qué derechos tiene.</p>
<h2>1. Quién trata los datos personales</h2>
<p>Los datos personales recibidos a través del sitio web de Space Glass son tratados por Space Glass en la medida necesaria para atender consultas, preparar ofertas, ejecutar pedidos y atender a los clientes.</p>
<p>Para cualquier pregunta sobre los datos personales y esta Política, puede escribirnos a ${mail}.</p>
<h2>2. Qué datos podemos recibir</h2>
<p>Según la forma de contacto, podemos recibir:</p>
<ul>
<li>nombre y datos de contacto;</li>
<li>número de teléfono y dirección de correo electrónico;</li>
<li>la ciudad o el lugar del proyecto;</li>
<li>información sobre el producto, la estructura o el servicio que necesita;</li>
<li>parámetros y configuración seleccionados de un producto;</li>
<li>comentarios y otra información que indique en su solicitud;</li>
<li>fotos, planos, documentos y otros archivos enviados voluntariamente para un presupuesto o una consulta;</li>
<li>datos técnicos sobre el uso del sitio web, si para ello se utilizan cookies permitidas o herramientas de analítica web.</li>
</ul>
<p>También podemos recibir materiales que nos envíe voluntariamente para preparar una propuesta o realizar un proyecto: fotos de la obra, planos, esquemas, especificaciones técnicas, documentación de proyecto y otros archivos. En el caso de una candidatura de empleo, también puede tratarse de un currículum y de la información que haya incluido voluntariamente en él.</p>
<h2>3. Datos de los formularios del sitio web</h2>
<p>En el sitio web pueden utilizarse formularios de contacto, de pedido, de presupuesto orientativo, configuradores y otros formularios de solicitud.</p>
<p>Los datos que introduce en un formulario de este tipo se utilizan para atender esa solicitud concreta: contactar con usted, aclarar los parámetros, preparar un presupuesto o una propuesta comercial y, si es necesario, organizar la ejecución del pedido.</p>
<h2>4. Para qué utilizamos los datos</h2>
<p>Los datos personales pueden utilizarse para:</p>
<ul>
<li>responder a su consulta;</li>
<li>preparar un presupuesto orientativo o exacto;</li>
<li>asesorarle sobre productos, materiales y soluciones técnicas;</li>
<li>preparar una propuesta comercial;</li>
<li>coordinar la medición, la fabricación, el envío y la instalación;</li>
<li>celebrar y ejecutar un contrato o pedido;</li>
<li>prestar servicio técnico y de garantía;</li>
<li>garantizar el funcionamiento y la seguridad del sitio web y mejorarlo;</li>
<li>cumplir las obligaciones legales.</li>
</ul>
<p>Si nos contacta por motivos de empleo, los datos de su currículum y mensajes pueden utilizarse para valorar su candidatura, contactar con usted y organizar el proceso de selección. El currículum solo se conserva para posibles vacantes futuras si existe una base jurídica adecuada o el consentimiento del candidato.</p>
<h2>5. Bases jurídicas del tratamiento</h2>
<p>Según el caso, los datos se tratan sobre la base de su consentimiento voluntario, la necesidad de aplicar medidas precontractuales a petición suya, la ejecución de un contrato, los intereses legítimos de Space Glass o el cumplimiento de obligaciones legales.</p>
<p>Si un formulario incluye la confirmación obligatoria de aceptación de la Política de privacidad, la solicitud solo puede enviarse después de dicha confirmación.</p>
<h2>6. CRM y gestión de solicitudes</h2>
<p>Para organizar las consultas y la relación con los clientes, los datos de las solicitudes pueden transferirse a un sistema CRM y ser utilizados por empleados autorizados de Space Glass para gestionar la consulta.</p>
<p>El acceso a estos datos se concede solo en la medida necesaria para las funciones correspondientes.</p>
<h2>7. Teléfono, correo electrónico y mensajería</h2>
<p>Si nos deja un número de teléfono o una dirección de correo, o se pone en contacto con Space Glass por Telegram u otro canal disponible, estos datos de contacto y el contenido de la correspondencia pueden utilizarse para responder a su consulta y para la comunicación posterior sobre el proyecto o el pedido.</p>
<p>Cuando se utiliza un servicio de mensajería de terceros, parte de los datos también puede ser tratada por el proveedor de ese servicio conforme a sus propias condiciones y política de privacidad.</p>
<h2>8. Cookies y analítica</h2>
<p>El sitio web puede utilizar cookies técnicamente necesarias y, cuando exista una base jurídica adecuada o su consentimiento, herramientas de analítica para entender cómo utilizan el sitio los visitantes.</p>
<p>Encontrará más información sobre el uso de cookies en la <a href="${intlHref('cookies', 'es')}">Política de cookies</a>.</p>
<h2>9. Comunicación de datos a terceros</h2>
<p>Space Glass no vende los datos personales de los usuarios.</p>
<p>Para el funcionamiento del sitio web y la atención de consultas, los proveedores de CRM, alojamiento, correo electrónico, servicios informáticos, analítica y otros contratistas pueden acceder a determinados datos cuando sea necesario para prestar el servicio correspondiente.</p>
<p>Los datos también pueden comunicarse cuando lo exija la ley o una autoridad pública competente, o cuando sea necesario para proteger derechos e intereses legítimos.</p>
<p>En el funcionamiento del sitio web y la atención de consultas pueden intervenir proveedores de alojamiento e infraestructura técnica, sistemas CRM, analítica, correo electrónico, telefonía, mensajería y almacenamiento de archivos, así como contratistas que necesiten la información para ejecutar un pedido o proyecto concreto. Solo se transfieren los datos necesarios para la función correspondiente.</p>
<h2>10. Plazo de conservación</h2>
<p>Los datos personales se conservan únicamente durante el tiempo necesario para la finalidad con la que se obtuvieron, la gestión posterior de la consulta o la relación con el cliente, la ejecución del contrato, las obligaciones de garantía o los requisitos legales.</p>
<p>Cuando la finalidad deja de existir, los datos se eliminan, se anonimizan o se conservan solo cuando la ley exige su conservación.</p>
<h2>11. Protección de los datos personales</h2>
<p>Aplicamos medidas organizativas y técnicas razonables para proteger los datos personales frente a accesos no autorizados, pérdida, alteración, divulgación o uso indebido.</p>
<p>Le rogamos que no envíe a través de los formularios contraseñas, datos de pago completos ni otros datos que no sean necesarios para atender su consulta.</p>
<h2>12. Sus derechos</h2>
<p>En los casos y en la medida previstos por la legislación aplicable, usted puede:</p>
<ul>
<li>obtener información sobre el tratamiento de sus datos personales;</li>
<li>solicitar el acceso a ellos;</li>
<li>solicitar la rectificación de datos inexactos o incompletos;</li>
<li>solicitar la supresión de los datos si no existe base jurídica para seguir tratándolos;</li>
<li>solicitar la limitación del tratamiento en los casos previstos por la ley;</li>
<li>oponerse a determinadas formas de tratamiento;</li>
<li>retirar el consentimiento otorgado, cuando el tratamiento se base en el consentimiento;</li>
<li>presentar una reclamación ante la autoridad de protección de datos competente.</li>
</ul>
<h2>13. Cómo retirar el consentimiento o presentar una solicitud</h2>
<p>Para retirar su consentimiento o para aclarar, rectificar o suprimir sus datos personales, envíe una solicitud a ${mail}. Para proteger los datos, podemos pedirle la información necesaria para verificar la identidad del solicitante.</p>
<h2>14. Cambios en esta Política</h2>
<p>Podemos actualizar esta Política si cambian las funciones del sitio web, las formas de tratamiento de los datos o los requisitos legales. La versión vigente se publica siempre en esta página.</p>`
    },
    cookies: {
      title: 'Política de cookies',
      description: 'Política de cookies de Space Glass: qué archivos utiliza el sitio, para qué sirven, cómo funciona la analítica y cómo cambiar o retirar su consentimiento.',
      updated: '30 de agosto de 2026',
      html: `<h2>Qué son las cookies</h2><p>Las cookies son pequeños registros en el navegador que ayudan a guardar sus preferencias y a que el sitio web funcione correctamente.</p>
<h2>Cookies necesarias</h2><p>Guardan su configuración de consentimiento, un borrador de presupuesto y el contenido de su proyecto. Sin ellas, algunas funciones del configurador pueden no funcionar.</p>
<h2>Tecnologías de analítica y publicidad</h2><p>Google Analytics 4 y Meta Pixel solo se cargan después de su consentimiento y una vez configurados los identificadores de producción. Nos ayudan a valorar el rendimiento de las páginas y las campañas.</p>
<h2>Cómo cambiar su elección</h2><p>Elimine el registro <code>sg-cookie-consent</code> en la configuración de datos del sitio de su navegador, recargue la página y vuelva a elegir. El navegador también permite bloquear o eliminar las cookies.</p>`
    },
    terms: {
      title: 'Condiciones de uso',
      description: 'Condiciones de uso de Space Glass: normas del sitio y del configurador, presupuestos orientativos, derechos sobre contenidos, responsabilidad y contacto.',
      updated: '30 de agosto de 2026',
      html: `<h2>1. Disposiciones generales</h2><p>Al utilizar el sitio web, usted acepta estas condiciones. Los contenidos del sitio son informativos y pueden actualizarse sin previo aviso.</p>
<h2>2. Presupuestos y propuestas</h2><p>Los precios del configurador y las propuestas generadas automáticamente son orientativos y no constituyen una oferta pública. El precio final, el plazo, la configuración y la garantía se fijan en el contrato tras la medición y la revisión técnica.</p>
<h2>3. Propiedad intelectual</h2><p>Los textos, fotografías, planos, el diseño y las marcas pertenecen a Space Glass o se utilizan legítimamente. Su copia con fines comerciales requiere autorización por escrito.</p>
<h2>4. Responsabilidad</h2><p>Procuramos la exactitud y el funcionamiento continuo, pero no garantizamos la ausencia de fallos técnicos temporales. El usuario es responsable de la exactitud de las medidas y los datos de contacto facilitados.</p>
<h2>5. Contacto</h2><p>Preguntas sobre estas condiciones: ${mail}, <a href="tel:+380734251400">+380 73 425 14 00</a>.</p>`
    }
  }
};
