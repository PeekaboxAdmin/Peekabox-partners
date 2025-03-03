"use client"

import React from 'react'
import {
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
  ChevronRight,
} from 'lucide-react'
import Header from './Header'
import Sidebar from './Sidebar'
import MobileSidebar from './SideBarMobile'
import './Help.css'
import callcentre from './Images/call-center.png'
import amico from './Images/amico.png'
import pana from './Images/pana.png'
import box from './Images/box.png'
import phone from './Images/phone.png'
import book from './Images/book.png'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "What is Peekabox, and how does it work?",
    answer:
      "Peekabox connects managers with customers to help reduce food waste by offering surplus items at discounted prices. Customers reserve items, and managers prepare them for pickup within specified time slots.",
  },
  {
    question: "How do I log in to my Peekabox Manager account?",
    answer:
      "You can log in to your Peekabox Manager account using your registered email address and password on our website or mobile app.",
  },
  {
    question: "Can I change my login credentials?",
    answer:
      "Yes, you can change your login credentials through your account settings. Click on your profile and select 'Security Settings'.",
  },
  {
    question: "Can I edit or delete an existing offer?",
    answer:
      "Yes, you can edit or delete offers through the 'Manage Offers' section in your dashboard, as long as they haven't been reserved by customers.",
  },
  {
    question: "Why isn't my offer visible to customers?",
    answer:
      "Offers might not be visible if they're scheduled for future dates, are marked as inactive, or don't meet our guidelines. Check the offer status in your dashboard.",
  },
  // Added more FAQs to demonstrate multiple pages:
  {
    question: "Can I update the status of an order?",
    answer: "Yes, you can update orders from your Manager Dashboard at any time.",
  },
  {
    question: "What should I do if an order is canceled by a customer?",
    answer: "You can restock the item or mark it as unsold in your Manager Dashboard.",
  },
  {
    question: "How do I respond to customer reviews or feedback?",
    answer: "Use the built-in feedback system in your Manager Dashboard to reply or address concerns.",
  },
  {
    question: "Is there a way to schedule offers in advance?",
    answer: "Yes, you can create future offers and set a start date so they become visible at the right time.",
  },
  {
    question: "Where can I see my order history?",
    answer: "Your order history is located in the 'Order History' tab within the Manager Dashboard.",
  },
]

const HelpPage: React.FC = () => {
  const [sidebarExpanded, setSidebarExpanded] = React.useState(false)

  // For toggling each FAQ
  const [expandedFAQ, setExpandedFAQ] = React.useState<number | null>(null)

  // Pagination state
  const [currentPage, setCurrentPage] = React.useState(1)
  const faqsPerPage = 5

  // Calculate total pages
  const totalPages = Math.ceil(faqs.length / faqsPerPage)

  // Slice the FAQs for the current page
  const startIndex = (currentPage - 1) * faqsPerPage
  const endIndex = startIndex + faqsPerPage
  const currentFAQs = faqs.slice(startIndex, endIndex)

  // Toggle the sidebar
  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded)
  }

  // Toggle which FAQ is expanded
  const toggleFAQ = (globalIndex: number) => {
    setExpandedFAQ(expandedFAQ === globalIndex ? null : globalIndex)
  }

  // Pagination handlers
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    setExpandedFAQ(null) // Optional: collapse any open FAQ when page changes
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      setExpandedFAQ(null)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      setExpandedFAQ(null)
    }
  }

  return (
    <div className="help-page-container">
      <Header />
      <MobileSidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} />
      <Sidebar isOpen={sidebarExpanded} onToggle={toggleSidebar} onNavClick={() => {}} />

      <div className="help-content">
        <h1>Our Commitment to Exceptional Support</h1>

        <div className="support-options">
          <div className="support-card">
            <div className="support-icon">
                <img src={callcentre} alt="" />
            </div>
            <h3>Live Chat Support</h3>
            <p>
              Our live chat support provides quick and convenient assistance,
              allowing you to get help right when you need it. Whether you need
              to report technical issues, resolve issues, answer questions, or get
              guidance on using the platform, we're here to make sure your
              experience is smooth and efficient.
            </p>
            <button className="support-button">Chat Now</button>
          </div>

          <div className="support-card">
            <div className="support-icon">
                <img src={amico} alt="" />
            </div>
            <h3>Phone Support</h3>
            <p>
              Our dedicated phone support team is here to assist you with any
              questions or issues. Whether you need help with technical support,
              we're just a call away, ready to provide prompt and efficient
              assistance.
            </p>
            <button className="support-button">Call Now</button>
          </div>

          <div className="support-card">
            <div className="support-icon">
                <img src={pana} alt="" />
            </div>
            <h3>Email Support</h3>
            <p>
              Our live chat support provides quick and convenient assistance,
              allowing you to get help right when you need it. Whether you need to
              report technical issues, we're here to make sure your experience is
              smooth and efficient.
            </p>
            <button className="support-button">Send Email</button>
          </div>
        </div>

        <div className="report-issue-section">
          <h2>Report a Technical Issue</h2>
          <form className="report-form">
            <div className="form-row">
              <div className="form-group">
                <input type="text" placeholder="Full Name" />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Email" />
              </div>
            </div>
            <div className="form-group">
              <input type="tel" placeholder="Phone" />
            </div>
            <div className="form-group">
              <textarea placeholder="Message" rows={4}></textarea>
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>

        <div className="support-stats">
          <h2>Seamless Support No Extra Effort Required</h2>
          <p>
            We aim to make your experience as smooth as possible. There’s no need for
            you to fill out lengthy FAQ forms or read extensive training materials.
            Simply forward us a few past customer interactions (such as past chats
            or emails), and we’ll handle the rest. Our live customer chat simulator
            will be trained on your specific process, allowing us to provide
            consistent, high-quality support that’s perfectly aligned with your
            needs, and to train our team effectively.
          </p>
          <div className="stat-items">
            <div className="stat-item">
              <h3>10/10</h3>
              <p>Our service Rating</p>
            </div>
            <div className="stat-item">
              <h3>122,459</h3>
              <p>Interactions Handled Everyday</p>
            </div>
            <div className="stat-item">
              <h3>14566</h3>
              <p>Hours of Support Provided Everyday</p>
            </div>
          </div>
        </div>

        {/* FAQ Section with Pagination */}
        <div className="faq-section">
          <h2>Troubleshooting &amp; Some Common Questions</h2>
          <div className="faq-list">
            {currentFAQs.map((faq, index) => {
              const globalIndex = startIndex + index
              return (
                <div
                  key={globalIndex}
                  className={`faq-item ${expandedFAQ === globalIndex ? 'expanded' : ''}`}
                  onClick={() => toggleFAQ(globalIndex)}
                >
                  <div className="faq-question">
                    <span>{faq.question}</span>
                    {expandedFAQ === globalIndex ? (
                      <ChevronDown size={20} />
                    ) : (
                      <ChevronRight size={20} />
                    )}
                  </div>
                  {expandedFAQ === globalIndex && (
                    <div className="faq-answer">{faq.answer}</div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Pagination Controls */}
          <div className="pagination">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="page-button"
            >
              &lt; Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`page-button ${pageNum === currentPage ? 'active' : ''}`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="page-button"
            >
              Next &gt;
            </button>
          </div>
        </div>

        <div className="training-section">
          <h2>Training Resources</h2>
          <div className="training-cards">
            <div className="training-card">
              <img src={phone} alt="" />
              <h3>Platform Updates</h3>
              <p>
                Regularly updated information on new features, improvements, or changes to the platform. Release notes that explain recent updates and how they benefit managers.
              </p>
              <button className="learn-more-button">Learn More</button>
            </div>
            <div className="training-card">
              <img src={box} alt="" />
              <h3>Best Practices</h3>
              <p>
                Access articles and resources focused on how to optimize availability
                and use notifications to drive customer interest.
              </p>
              <button className="learn-more-button">Learn More</button>
            </div>
            <div className="training-card">
              <img src={book} alt="" />
              <h3>Specific Guides</h3>
              <p>
                Order Management
                Managing orders efficiently is crucial for ensuring a smooth experience for both managers and customers. This guide will help you understand the process of handling orders, updating statuses, and troubleshooting common issues.
              </p>
              <button className="learn-more-button">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpPage
