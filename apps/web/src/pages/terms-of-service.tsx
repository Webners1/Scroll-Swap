/* eslint-disable react/no-unescaped-entities */
import { Flex, Text } from '@pancakeswap/uikit'
import { styled } from 'styled-components'

export const Container = styled(Flex)`
  display: grid;
  max-width: 650px;
  margin: 50px auto;
  padding: 0px 16px;

  h1 {
    font-size: 2.25rem;
    font-width: bold;
  }

  h3 {
    margin: 1em 0px 0.5em;
    font-weight: bold;
  }

  p {
    opacity: 0.94;
    margin-bottom: 1em;
    line-height: 24px;
  }

  li {
    margin: 0.5em 0px 0px 1em;
    color: ${({ theme }) => theme.colors.white};
  }
`

const TermsOfService = () => {
  return (
    <Container>
      <Text as="h1">Terms and Conditions for LolPad Finance</Text>
      <Text as="h3" color="white">
        Last modified: Feb 28, 2023
      </Text>
      <Text as="p">
        <Text as="span" color="white">
          Welcome to LolPad Finance ("LolPad," "we," "us," or "our"). These Terms and Conditions ("Terms") govern your
          access to and use of LolPad's decentralized application ("dApp") and related services provided through our
          platform.
        </Text>
      </Text>

      <Text as="h3">1. Acceptance of Terms</Text>
      <Text as="p" color="white">
        By accessing or using the LolPad dApp, you agree to be bound by these Terms and all applicable laws and
        regulations. If you do not agree with any part of these Terms, you may not access or use the dApp.
      </Text>

      <Text as="h3">2. Beta Version</Text>
      <Text as="p">
        <Text as="span" color="white">
          Please note that the LolPad dApp is currently in Beta Version. This means that it is still under development
          and may contain bugs, errors, or vulnerabilities. By using the dApp, you acknowledge and accept the risks
          associated with its use during this Beta period. These risks include but are not limited to:
        </Text>
        <ul>
          <li>Potential loss of funds or assets due to bugs or vulnerabilities in the dApp.</li>
          <li>Limited functionality or performance issues.</li>
          <li>Changes to features, functionalities, or terms without prior notice.</li>
          <li>Lack of comprehensive security measures compared to a fully developed and audited platform.</li>
        </ul>
      </Text>

      <Text as="h3">3. Audit and Security</Text>
      <Text as="p" color="white">
        We are committed to ensuring the security and reliability of the LolPad dApp. To achieve this, we will perform
        regular audits with the support of top auditing firms. However, we cannot guarantee that the dApp will be
        completely free from vulnerabilities or security breaches.
      </Text>

      <Text as="h3">4. Limitation of Liability</Text>
      <Text as="p" color="white">
        In no event shall LolPad, its affiliates, partners, or licensors be liable for any direct, indirect, incidental,
        special, or consequential damages arising out of or in any way connected with your use of the dApp, whether
        based on contract, tort, strict liability, or any other legal theory, even if we have been advised of the
        possibility of such damages.
      </Text>

      <Text as="p" color="white">
        Furthermore, you agree that LolPad Finance and its team shall not be held liable for any financial losses or
        damages resulting from vulnerabilities, breaches, or any other issues related to the dApp, whether such losses
        occur to you directly or indirectly.
      </Text>

      <Text as="h3">5. Changes to Terms</Text>
      <Text as="p" color="white">
        We reserve the right to update or modify these Terms at any time without prior notice. Any changes will be
        effective immediately upon posting on this page. Your continued use of the dApp after the posting of any changes
        constitutes acceptance of those changes.
      </Text>

      <Text as="h3">6. Governing Law</Text>
      <Text as="p" color="white">
        These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to
        its conflict of law provisions.
      </Text>

      <Text as="h3">7. Contact Us</Text>
      <Text as="p" color="white">
        If you have any questions or concerns about these Terms and Conditions, please reach us via our official social
        handle. Also, keep in mind we're in Beta Version so any type of bug might happen. But our team will look for the
        bug if any and fix it out and will work for improvement of our service.
      </Text>

      <Text as="p" color="white">
        Thank you for using LolPad Finance!
      </Text>

      <Text as="p" color="white">
        By accessing or using the LolPad dApp, you acknowledge that you have read, understood, and agree to be bound by
        these Terms and all applicable laws and regulations.
      </Text>
    </Container>
  )
}

TermsOfService.chains = []

export default TermsOfService
