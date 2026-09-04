import LegalPage from '../components/LegalPage'
const sections = [
  { heading: 'Registration Fee', paragraphs: ['The candidate registration fee is Rs. 300 plus 18% GST, for a total payable amount of Rs. 354. Payment is processed through the payment gateway available on this website.'] },
  { heading: 'Purpose of Registration', paragraphs: ['Registration allows Fescora Management to consider a candidate profile for current or upcoming employment opportunities that may be relevant to the information provided.'] },
  { heading: 'No Employment or Placement Guarantee', paragraphs: ['Registration and payment do not guarantee employment, placement or an interview. Further contact depends on profile suitability and available requirements.'] },
  { heading: 'Candidate Information', paragraphs: ['Candidates must provide accurate, complete and current information. False, misleading or fraudulent information may result in rejection of a profile or cancellation of registration consideration.'] },
  { heading: 'Member ID', paragraphs: ['A Fescora Member ID is a registration and reference identifier. It is not proof of employment or placement. Candidates are responsible for keeping their Member ID safe for future communication.'] },
  { heading: 'Candidate Communication', paragraphs: ['Fescora Management may contact candidates using the details provided regarding relevant opportunities, profile review or registration-related communication.'] },
  { heading: 'Related Policies and Contact', paragraphs: ['These terms should be read with the Privacy Policy, Terms and Conditions and Refund Policy. Questions may be sent to [Fescora Management official contact details].'] },
]
export default function CandidateRegistrationTerms() { return <LegalPage eyebrow="Candidate Registration" title="Candidate Registration Terms" intro="Terms that apply when registering a candidate profile with Fescora Management." sections={sections} /> }