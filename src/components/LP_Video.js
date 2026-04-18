import { useState, useEffect } from 'react';

const LP_Video = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      {/* Video Background */}
      <video
        src="/Gearshift/video.mp4"
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          minHeight: '600px'
        }}
      />

      {/* Dark Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1
      }} />

      {/* Scrolling Text Strip */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: '10px 0',

        zIndex: 3
      }}>
        <div style={{
          display: 'inline-block',
          animation: 'scrollText 20s linear infinite',
          fontSize: '2rem',
          color: 'white',
          fontFamily: 'Times New Roman, serif',
          fontWeight: 'bold',
          letterSpacing: '2px',
          width: '200%',
          color: 'black'
        }}>
          TRUSTED PROFESSIONALS • TRANSPARENT PRICING • REAL-TIME AVAILABILITY • VERIFIED REVIEWS • SEAMLESS BOOKING • EXPERT SERVICE • TRUSTED PROFESSIONALS • TRANSPARENT PRICING • REAL-TIME AVAILABILITY • VERIFIED REVIEWS • SEAMLESS BOOKING • EXPERT SERVICE
        </div>
      </div>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        padding: '80px 20px',
        maxWidth: '1200px',
        margin: '0 auto',
        marginTop: '0px'
      }}>
        {/* Main Heading */}
        <h2 style={{
          fontSize: '10rem',
          color: 'white',
          textAlign: 'center',
          marginBottom: '50px',
          fontFamily: 'Times New Roman, serif',
          fontWeight: 'bold',
          letterSpacing: '1px'
        }}>
          What We Offer
        </h2>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gridAutoRows: '1fr',
          gap: '30px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {/* Card 1 */}
          <div
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              backgroundColor: hoveredCard === 1 ? 'white' : 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '30px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'transform 0.3s ease, background 0.3s ease, color 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '250px',
              height: '100%'
            }}
          >
            <h3 style={{
              fontSize: '1.8rem',
              color: hoveredCard === 1 ? 'black' : 'white',
              marginBottom: '15px',
              fontFamily: 'Times New Roman, serif',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              transition: 'color 0.3s ease'
            }}>
              Trusted Shops
            </h3>
            <p style={{
              fontSize: '1rem',
              color: hoveredCard === 1 ? 'black' : 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.6',
              transition: 'color 0.3s ease'
            }}>
              Explore our curated network of verified automotive professionals. Filter by specialty, ratings, and availability to find your perfect match.
            </p>
          </div>

          {/* Card 2 */}
          <div
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              backgroundColor: hoveredCard === 2 ? 'white' : 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '30px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'transform 0.3s ease, background 0.3s ease, color 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '250px',
              height: '100%'
            }}
          >
            <h3 style={{
              fontSize: '1.8rem',
              color: hoveredCard === 2 ? 'black' : 'white',
              marginBottom: '15px',
              fontFamily: 'Times New Roman, serif',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              transition: 'color 0.3s ease'
            }}>
              Schedule with Ease
            </h3>
            <p style={{
              fontSize: '1rem',
              color: hoveredCard === 2 ? 'black' : 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.6',
              transition: 'color 0.3s ease'
            }}>
              Book appointments instantly with transparent pricing and real-time availability. Your service, your schedule, your terms.
            </p>
          </div>

          {/* Card 3 */}
          <div
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              backgroundColor: hoveredCard === 3 ? 'white' : 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '30px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'transform 0.3s ease, background 0.3s ease, color 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '250px',
              height: '100%'
            }}
          >
            <h3 style={{
              fontSize: '1.8rem',
              color: hoveredCard === 3 ? 'black' : 'white',
              marginBottom: '15px',
              fontFamily: 'Times New Roman, serif',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              transition: 'color 0.3s ease'
            }}>
              Maintainance Tracking
            </h3>
            <p style={{
              fontSize: '1rem',
              color: hoveredCard === 3 ? 'black' : 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.6',
              transition: 'color 0.3s ease'
            }}>
              Track your complete service history, receive intelligent maintenance reminders, and gain valuable insights into your vehicle's health.
            </p>
          </div>

          {/* Card 4 */}
          <div
            onMouseEnter={() => setHoveredCard(4)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              backgroundColor: hoveredCard === 4 ? 'white' : 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '30px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'transform 0.3s ease, background 0.3s ease, color 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '250px',
              height: '100%'
            }}
          >
            <h3 style={{
              fontSize: '1.8rem',
              color: hoveredCard === 4 ? 'black' : 'white',
              marginBottom: '15px',
              fontFamily: 'Times New Roman, serif',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              transition: 'color 0.3s ease'
            }}>
              Compare Pricing
            </h3>
            <p style={{
              fontSize: '1rem',
              color: hoveredCard === 4 ? 'black' : 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.6',
              transition: 'color 0.3s ease'
            }}>
              Access transparent pricing from multiple providers. Make informed decisions with detailed cost breakdowns and service estimates.
            </p>
          </div>

          {/* Card 5 */}
          <div
            onMouseEnter={() => setHoveredCard(5)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              backgroundColor: hoveredCard === 5 ? 'white' : 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '30px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'transform 0.3s ease, background 0.3s ease, color 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '250px',
              height: '100%'
            }}
          >
            <h3 style={{
              fontSize: '1.8rem',
              color: hoveredCard === 5 ? 'black' : 'white',
              marginBottom: '15px',
              fontFamily: 'Times New Roman, serif',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              transition: 'color 0.3s ease'
            }}>
              Read Reviews
            </h3>
            <p style={{
              fontSize: '1rem',
              color: hoveredCard === 5 ? 'black' : 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.6',
              transition: 'color 0.3s ease'
            }}>
              Browse authentic reviews from verified customers. Discover trusted mechanics through real experiences and community feedback.
            </p>
          </div>

          {/* Card 6 */}
          <div
            onMouseEnter={() => setHoveredCard(6)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              backgroundColor: hoveredCard === 6 ? 'white' : 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '30px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'transform 0.3s ease, background 0.3s ease, color 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '250px',
              height: '100%'
            }}
          >
            <h3 style={{
              fontSize: '1.8rem',
              color: hoveredCard === 6 ? 'black' : 'white',
              marginBottom: '15px',
              fontFamily: 'Times New Roman, serif',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              transition: 'color 0.3s ease'
            }}>
              Get Support
            </h3>
            <p style={{
              fontSize: '1rem',
              color: hoveredCard === 6 ? 'black' : 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.6',
              transition: 'color 0.3s ease'
            }}>
              Connect with our dedicated support team for any assistance. We're here to ensure your experience is seamless from start to finish.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LP_Video;