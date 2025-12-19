import DoubleButton from '@/components/buttons/DoubleButton';
import { ContactUsFormErrors } from '@/lib/contactFormValidation';
import { ChangeEvent, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './styles/phoneInput.css';

interface FormProps {
  formErrors: ContactUsFormErrors;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSend?: () => void; // ✅ ADDED (optional & safe)
}

export default function Form({ formErrors, onChange, onSend }: FormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    text: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    text: '',
  });

  const validateForm = () => {
    let newErrors = { fullName: '', email: '', phone: '', text: '' };
    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
      isValid = false;
    }

    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = 'Valid Email is required.';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
      isValid = false;
    }

    if (!formData.text.trim()) {
      newErrors.text = 'Message is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    onChange(e);
  };

  const handlePhoneChange = (value: string) => {
    setFormData({ ...formData, phone: value });
    setErrors({ ...errors, phone: '' });
    onChange({
      target: { name: 'phone', value },
    } as unknown as ChangeEvent<HTMLInputElement>);
  };

  const handleSendInternal = async () => {
    if (!validateForm()) return;

    const web3FormsURL = 'https://api.web3forms.com/submit';
    const accessKey = '88de83e1-4987-4cef-a60b-2656f86cec49';

    const submissionData = {
      access_key: accessKey,
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      message: formData.text,
    };

    try {
      const response = await fetch(web3FormsURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (result.success) {
        alert('Form submitted successfully!');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          text: '',
        });
      } else {
        alert('Error submitting form.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="flex w-full animate-appear flex-col items-center justify-center gap-5 rounded-3xl bg-gradient-to-br from-primary/30 p-5 py-14 caret-primary md:w-3/4 md:shadow-blblur md:shadow-primary/50 lg:w-3/6">
      <div className="w-full text-center text-5xl">Contact</div>

      <div className="flex w-full flex-col gap-5">
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <div className="flex w-full flex-col md:w-1/2">
            <input
              className={`${errors.fullName ? 'border-2 border-red-700' : ''} rounded-xl bg-primary/60 p-1 px-5 text-2xl`}
              placeholder="Full Name*"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            <span className="px-2 text-lg text-red-700">
              {errors.fullName}
            </span>
          </div>

          <div className="flex w-full flex-col md:w-1/2">
            <input
              className={`${errors.email ? 'border-2 border-red-700' : ''} rounded-xl bg-primary/60 p-1 px-5 text-2xl`}
              placeholder="Email address*"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <span className="px-2 text-lg text-red-700">
              {errors.email}
            </span>
          </div>
        </div>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <div className="flex w-full flex-col md:w-1/2">
            <PhoneInput
              inputClass="phone-input"
              buttonClass="phone-input-button"
              country="in"
              value={formData.phone}
              onChange={handlePhoneChange}
            />
            <span className="px-2 text-lg text-red-700">
              {errors.phone}
            </span>
          </div>

          <div className="flex w-full flex-col md:w-1/2">
            <input
              className="rounded-xl bg-primary/60 p-1 px-5 text-2xl"
              placeholder="Company Name (optional)"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col md:w-3/4">
        <textarea
          className={`${errors.text ? 'border-2 border-red-700' : ''} w-full resize-none rounded-xl bg-primary/60 p-1 px-5 text-2xl`}
          placeholder="How can we help you?*"
          name="text"
          value={formData.text}
          onChange={handleChange}
          rows={4}
        />
        <span className="px-2 text-lg text-red-700">{errors.text}</span>
      </div>

      <DoubleButton
        label="Send now!"
        onClick={onSend ?? handleSendInternal} // ✅ FIXED
        className="px-4 text-xl lg:px-10 lg:text-xl"
      />
    </div>
  );
}
