import checkContactData, { ContactUsFormErrors } from '@/lib/contactFormValidation';
import emailjs from '@emailjs/browser';
import { ChangeEvent, useState } from 'react';
import Failure from './Failure';
import Form from './Form';
import Loader from './Loader';
import Success from './Success';

const initialFormData: ContactUsFormData = {
  fullName: '',
  email: '',
  text: ''
};
interface ContactUsFormProps {
  className?: string;
}

export interface ContactUsFormData {
  fullName: string;
  email: string;
  text: string;
  phone?: string;
  company?: string;
}

export default function ContactUsForm(props: ContactUsFormProps) {
  const { className } = props;
  const [formData, setFormData] = useState<ContactUsFormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<ContactUsFormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(true);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

 const onSend = async () => {
  const errors = checkContactData(formData);

  if (errors) {
    setFormErrors(errors);
    return;
  }

  setShowForm(false);
  setLoading(true);

  const web3FormsURL = 'https://api.web3forms.com/submit';
  const accessKey = '88de83e1-4987-4cef-a60b-2656f86cec49';

  const submissionData = {
    access_key: accessKey,
    name: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    company: formData.company,
    message: formData.text
  };

  try {
    const response = await fetch(web3FormsURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(submissionData)
    });

    const result = await response.json();

    setLoading(false);

    if (result.success) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  } catch (error) {
    console.error(error);
    setLoading(false);
    setIsSuccess(false);
  }
};

  return (
    <div
      id='contactUs'
      className={`${className} relative flex h-full w-full flex-col items-center justify-center border-b-4 border-b-primary p-2 py-10 pb-16 font-dongle text-secondary`}
    >
      <div className='spotlight spotlight-left'></div>
      {showForm && <Form onChange={onChange} onSend={onSend} formErrors={formErrors} />}
      {loading && <Loader />}
      {isSuccess && <Success />}
      {!isSuccess && !showForm && !loading && <Failure setShowForm={setShowForm} />}
    </div>
  );
}
