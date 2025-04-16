// src/components/Editor.jsx
import React, { useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";

const Editor = ({ pageName = "home" }) => {
  const editorRef = useRef(null);
  const editorInstance = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    if (editorInstance.current) {
      editorInstance.current.destroy();
      editorInstance.current = null;
    }

    const editor = grapesjs.init({
      container: editorRef.current,
      height: "100vh",
      width: "auto",
      fromElement: false,
      storageManager: false,
      plugins: [],
      pluginsOpts: {},
    });

 
    editor.setComponents(`
      <!-- NAVIGATION -->
      <header style="background-color: #fff0f5; padding: 20px 40px; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 2px 4px rgba(0,0,0,0.05); font-family: 'Outfit', sans-serif;">
        <h2 style="font-size: 24px; color: #b56576; font-weight: bold;">Glow Beauty Spa</h2>
        <nav>
          <ul style="display: flex; gap: 20px; list-style: none; margin: 0; padding: 0;">
            <li><a href="#home" style="color: #b56576; font-weight: 500;">Home</a></li>
            <li><a href="#services" style="color: #b56576; font-weight: 500;">Services</a></li>
            <li><a href="#testimonials" style="color: #b56576; font-weight: 500;">Testimonials</a></li>
            <li><a href="#contact" style="color: #b56576; font-weight: 500;">Contact</a></li>
          </ul>
        </nav>
      </header>
    
      <!-- HOME SECTION -->
      <section id="home" style="font-family: 'Outfit', sans-serif; padding: 60px 20px; text-align: center; background: linear-gradient(to bottom right, #fff0f5, #ffe4e1);">
        <h1 style="font-size: 48px; margin-bottom: 20px; color: #b56576;">Glow Beauty Spa</h1>
        <p style="font-size: 20px; max-width: 600px; margin: 0 auto; color: #444;">
          Rejuvenate your body and soul in our luxurious spa. Discover the harmony of beauty and wellness today.
        </p>
        <button style="margin-top: 30px; background-color: #b56576; color: white; padding: 15px 30px; font-size: 16px; border: none; border-radius: 8px; cursor: pointer;">
          Book an Appointment
        </button>
      </section>
    
      <!-- SERVICES SECTION -->
      <section id="services" style="background-color: #fff; padding: 60px 20px;">
        <h2 style="text-align: center; font-size: 36px; color: #b56576;">Our Services</h2>
        <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 30px; margin-top: 40px;">
          <div style="width: 280px; padding: 20px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); background: #fff;">
            <h3 style="color: #b56576;">Facials</h3>
            <p>Deep cleansing and hydrating facial treatments for radiant skin.</p>
          </div>
          <div style="width: 280px; padding: 20px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); background: #fff;">
            <h3 style="color: #b56576;">Massage</h3>
            <p>Relaxing full-body massage therapies that melt your stress away.</p>
          </div>
          <div style="width: 280px; padding: 20px; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); background: #fff;">
            <h3 style="color: #b56576;">Nail Care</h3>
            <p>Professional manicures and pedicures for clean, healthy nails.</p>
          </div>
        </div>
      </section>
    
      <!-- TESTIMONIALS SECTION -->
      <section id="testimonials" style="padding: 40px 20px; background: #fdfdfd;">
        <h2 style="text-align: center; font-size: 32px; color: #b56576;">What Our Clients Say</h2>
        <div style="display: flex; justify-content: center; gap: 20px; margin-top: 30px; flex-wrap: wrap;">
          <div style="max-width: 350px; padding: 20px; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
            <p>"Absolutely loved the facial and massage session. So relaxing!"</p>
            <p style="margin-top: 10px; font-weight: bold;">– Angela</p>
          </div>
          <div style="max-width: 350px; padding: 20px; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
            <p>"Top-notch service. My skin is glowing!"</p>
            <p style="margin-top: 10px; font-weight: bold;">– Chika</p>
          </div>
        </div>
      </section>
    
      <!-- CONTACT SECTION -->
      <section id="contact" style="padding: 60px 20px; background-color: #fff0f5;">
        <h2 style="text-align: center; font-size: 36px; color: #b56576;">Contact Us</h2>
        <form style="max-width: 500px; margin: 30px auto; display: flex; flex-direction: column; gap: 20px;">
          <input type="text" placeholder="Your Name" style="padding: 12px; border-radius: 8px; border: 1px solid #ccc;" />
          <input type="email" placeholder="Your Email" style="padding: 12px; border-radius: 8px; border: 1px solid #ccc;" />
          <textarea placeholder="Your Message" style="padding: 12px; border-radius: 8px; border: 1px solid #ccc;"></textarea>
          <button style="padding: 15px; background-color: #b56576; color: white; border: none; border-radius: 8px; font-size: 16px;">Send Message</button>
        </form>
      </section>
    
      <!-- FOOTER -->
      <footer style="text-align: center; padding: 20px; background-color: #b56576; color: white;">
        <p>&copy; 2025 Glow Beauty Spa. All rights reserved.</p>
      </footer>
    `);
    

    editorInstance.current = editor;

    return () => {
      editor.destroy();
    };
  }, [pageName]);

  return <div ref={editorRef} />;
};

export default Editor;
