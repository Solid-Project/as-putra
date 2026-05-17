import React from "react";
import { Link } from "react-router-dom";
import LegalLayoutWrapper from "@/components/layout/LegalLayoutWrapper";

const TermsConditions = () => {
  return (
    <LegalLayoutWrapper title="Terms & Conditions" lastUpdated="May 17, 2026">
      
      <p>
        Welcome to AS Putra Group! These Terms and Conditions outline the rules and regulations for the use of AS Putra Group's Website, located at <Link to="/">https://asputra.andrey.id/</Link>.
      </p>
      
      <p>
        By accessing this website, we assume you accept these terms and conditions. Do not continue to use AS Putra Group if you do not agree to take all of the terms and conditions stated on this page.
      </p>

      <h3>Interpretation and Definitions</h3>
      <h4>Interpretation</h4>
      <p>
        The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
      </p>
      
      <h4>Definitions</h4>
      <p>For the purposes of these Terms and Conditions:</p>
      <ul>
        <li>
          <p><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to AS Putra Group, Jl. Jend. Sudirman No.125, Winduhaji, Kuningan, Jawa Barat 45516.</p>
        </li>
        <li>
          <p><strong>Device</strong> means any device that can access the Service such as a computer, a cell phone or a digital tablet.</p>
        </li>
        <li>
          <p><strong>Service</strong> refers to the Website.</p>
        </li>
        <li>
          <p><strong>Website</strong> refers to AS Putra Group, accessible from <Link to="/">https://asputra.andrey.id/</Link>.</p>
        </li>
        <li>
          <p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
        </li>
      </ul>

      <h3>Intellectual Property Rights</h3>
      <p>
        Other than the content you own, under these Terms, AS Putra Group and/or its licensors own all the intellectual property rights and materials contained in this Website. All intellectual property rights are reserved. 
      </p>
      <p>
        You are granted a limited license only for purposes of viewing the material contained on this Website, subject to restrictions set in these terms. You must not:
      </p>
      <ul>
        <li>Republish material, corporate logos, text, or imagery from AS Putra Group without prior written consent.</li>
        <li>Sell, rent, or sub-license material from the Website.</li>
        <li>Reproduce, duplicate, or copy material from the Website for commercial duplication.</li>
        <li>Redistribute content from AS Putra Group (unless content is specifically made for redistribution).</li>
      </ul>

      <h3>User Restrictions</h3>
      <p>
        You are specifically restricted from all of the following:
      </p>
      <ul>
        <li>Using this Website in any way that is or may be damaging to this Website or its infrastructure;</li>
        <li>Using this Website in any way that impacts user access, including disrupting the custom full-page scroll animations or navigation scripts;</li>
        <li>Using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;</li>
        <li>Engaging in any data mining, data harvesting, data extracting, or any other similar activity in relation to this Website;</li>
        <li>Using this Website to engage in any unauthorized advertising or marketing.</li>
      </ul>

      <h3>Recruitment & Career Portal Disclaimer</h3>
      <p>
        AS Putra Group operates a digital career portal within this Website. All job openings posted are official vacancies managed by Our HR Department. We explicitly state that:
      </p>
      <ul>
        <li>The recruitment process within AS Putra Group is entirely <strong>free of charge</strong>. We never demand payments, administrative fees, or travel accommodations packages from candidates.</li>
        <li>The Company is not liable for any fraudulent recruitment schemes or financial losses occurring on external platforms falsely using the AS Putra Group brand name.</li>
      </ul>

      <h3>No Warranties</h3>
      <p>
        This Website is provided "as is," with all faults, and AS Putra Group expresses no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.
      </p>

      <h3>Limitation of Liability</h3>
      <p>
        In no event shall AS Putra Group, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. AS Putra Group, including its officers, directors, and employees shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this Website.
      </p>

      <h3>Indemnification</h3>
      <p>
        You hereby indemnify to the fullest extent AS Putra Group from and against any and/or all liabilities, costs, demands, causes of action, damages, and expenses arising in any way related to your breach of any of the provisions of these Terms.
      </p>

      <h3>Severability</h3>
      <p>
        If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.
      </p>

      <h3>Variation of Terms</h3>
      <p>
        AS Putra Group is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis. Continued use of the platform after any changes constitutes acceptance of the updated Terms.
      </p>

      <h3>Assignment</h3>
      <p>
        The AS Putra Group is allowed to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.
      </p>

      <h3>Entire Agreement</h3>
      <p>
        These Terms constitute the entire agreement between AS Putra Group and you in relation to your use of this Website, and supersede all prior agreements and understandings.
      </p>

      <h3>Governing Law & Jurisdiction</h3>
      <p>
        These Terms will be governed by and interpreted in accordance with the laws of the <strong>Republic of Indonesia</strong>. You submit to the non-exclusive jurisdiction of the state and federal courts located in Indonesia—specifically the District Court of Kuningan (Pengadilan Negeri Kuningan)—for the resolution of any disputes.
      </p>

      <h3>Contact Us</h3>
      <p>
        If you have any questions or require further clarification regarding these Terms and Conditions, please feel free to reach out to our corporate headquarters:
      </p>
      <ul>
        <li>By email: office@asputra.gmail.com</li>
        <li>By visiting our headquarters: Jl. Jend. Sudirman No.125, Winduhaji, Kuningan, Jawa Barat 45516.</li>
      </ul>

    </LegalLayoutWrapper>
  );
};

export default TermsConditions;