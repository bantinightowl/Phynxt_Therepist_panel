import React from 'react';
import Sidebar from "../../../Sidebar/Sidebar";
import Header from "../../../Header/Header";
import { FaUniversity, FaUsers, FaAward, FaBullseye } from 'react-icons/fa';

const AboutUs = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Founder & Director",
      bio: "PhD in Education with 15+ years of experience in academic leadership.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Technical Head",
      bio: "Expert in educational technology and platform development.",
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "Student Relations",
      bio: "Dedicated to ensuring exceptional student experiences and support.",
    }
  ];

  const achievements = [
    { icon: <FaUniversity className="text-blue-500 text-3xl" />, title: "15+ Years", description: "Of educational excellence" },
    { icon: <FaUsers className="text-blue-500 text-3xl" />, title: "10,000+", description: "Students empowered" },
    { icon: <FaAward className="text-blue-500 text-3xl" />, title: "25+", description: "National awards won" },
    { icon: <FaBullseye className="text-blue-500 text-3xl" />, title: "100%", description: "Graduate satisfaction" }
  ];

  return (
    <div className="flex h-screen">
      <Sidebar activePage="/about-us"/>
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <section className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">About Our Services</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Providing quality physiotherapy services since 2005. Our expert therapists are dedicated to 
                helping you recover and improve your well-being with personalized care and treatment plans.
              </p>
            </section>
            <section className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <FaBullseye className="mr-2 text-blue-600" /> Our Mission
                </h2>
                <p className="text-gray-700">
                Our mission is to deliver exceptional physiotherapy and rehabilitation services that restore 
                movement, relieve pain, and enhance the quality of life for our patients.
                We are committed to providing individualized, evidence-based treatments tailored to each 
                patient’s unique needs and goals. Through compassionate care, clinical expertise, and advanced 
                therapeutic techniques, we strive to support our clients in achieving optimal health and sustained well-being.
                We believe in empowering patients through education, collaboration, and encouragement, fostering
                 a proactive approach to health and recovery. Our team dedicates itself to continuous learning 
                 and innovation to stay at the forefront of physiotherapy practices, ensuring the best possible 
                 outcomes for every individual we serve
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <FaUniversity className="mr-2 text-blue-600" /> Our Vision
                </h2>
                <p className="text-gray-700">
                Our vision is to be a beacon of hope and healing, empowering individuals to reclaim their physical health and embrace 
                life with renewed vitality. We aspire to redefine the experience of physiotherapy by blending clinical 
                excellence with compassionate care. Through continuous innovation, personalized treatments, and a 
                commitment to lifelong learning, we envision a future where every individual, regardless of their condition 
                or background, has access to high-quality therapy services that restore mobility, enhance independence, and 
                elevate overall well-being.
                We aim to build a trusted community of healing where patients feel valued, motivated, and 
                supported every step of their recovery journey. By setting new benchmarks in rehabilitation 
                and preventive care, we seek to contribute to a healthier, stronger, and more resilient society.
                  {/* To be recognized as a world-class institution that sets the standard for excellence in education, known for developing leaders who create positive change in their communities and professions. */}
                </p>
              </div>
            </section>
            <section className="mb-16">
  <h2 className="text-3xl font-bold text-gray-800 mb-6">Our History</h2>
  <div className="border-l-4 border-blue-500 pl-6">
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">2005 - Humble Beginnings</h3>
      <p className="text-gray-700">
        Started with a small clinic and a passionate team of 2 therapists, dedicated to offering personalized physiotherapy and rehabilitation services to the local community.
      </p>
    </div>
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">2010 - Growth and Recognition</h3>
      <p className="text-gray-700">
        Gained trust and recognition, expanding our team and introducing specialized services like sports injury rehabilitation and pediatric therapy.
      </p>
    </div>
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">2016 - Advanced Care Facilities</h3>
      <p className="text-gray-700">
        Opened a modern facility equipped with the latest physiotherapy technologies, offering advanced pain management and recovery programs.
      </p>
    </div>
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">2023 - Expanding Our Impact</h3>
      <p className="text-gray-700">
        Today, we proudly serve thousands of patients each year, with a commitment to innovation, holistic care, and helping every individual move better and live better.
      </p>
    </div>
  </div>
</section>
<section className="mb-16">
  <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Achievements</h2>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {[
      {
        icon: <i className="fas fa-user-md text-4xl text-blue-500"></i>,
        title: "10,000+ Patients",
        description: "Successfully helped over 10,000 patients regain strength and mobility.",
      },
      {
        icon: <i className="fas fa-award text-4xl text-green-500"></i>,
        title: "20+ Awards",
        description: "Recognized for excellence in physiotherapy care and rehabilitation services.",
      },
      {
        icon: <i className="fas fa-hands-helping text-4xl text-purple-500"></i>,
        title: "Expert Team",
        description: "A dedicated team of certified and experienced physiotherapists and therapists.",
      },
      {
        icon: <i className="fas fa-clinic-medical text-4xl text-red-500"></i>,
        title: "5 Clinics",
        description: "Expanded to 5 fully equipped therapy centers across the region.",
      },
    ].map((item, index) => (
      <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
        <div className="flex justify-center mb-4">{item.icon}</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.title}</h3>
        <p className="text-gray-600">{item.description}</p>
      </div>
    ))}
  </div>
</section>
<section className="bg-blue-50 rounded-lg p-8">
  <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Core Values</h2>
  <div className="grid md:grid-cols-3 gap-6">
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Compassion</h3>
      <p className="text-gray-700">
        We treat every patient with empathy, respect, and personalized care, understanding their unique journey to recovery.
      </p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Integrity</h3>
      <p className="text-gray-700">
        We uphold honesty, transparency, and ethical practices in all our treatments and patient interactions.
      </p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Excellence in Care</h3>
      <p className="text-gray-700">
        We strive to deliver the highest quality physiotherapy services, utilizing evidence-based techniques and continuous learning.
      </p>
    </div>
  </div>
</section>

          </div>
        </main>
      </div>
    </div>
  );
};

export default AboutUs;