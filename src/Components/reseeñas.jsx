import React from 'react';
import '../css/reseñas.css';
import { Link } from 'react-router-dom';
const reviews = [
  {
    id: 1,
    name: 'Juan Pérez',
    date: 'Septiembre 25, 2024',
    rating: 5,
    comment: 'La comida estuvo deliciosa y el ambiente es excelente. ¡Muy recomendado!',
  },
  {
    id: 2,
    name: 'María García',
    date: 'Septiembre 22, 2024',
    rating: 4,
    comment: 'El lugar es muy acogedor, pero el servicio fue un poco lento.',
  },
  {
    id: 3,
    name: 'Carlos López',
    date: 'Septiembre 20, 2024',
    rating: 3,
    comment: 'La comida estaba bien, pero no es nada fuera de lo común.',
  },
];

const ReviewCard = ({ name, date, rating, comment }) => {
  return (
    
    <div className="review-card">
      <div className="review-header">
        <h3>{name}</h3>
        <span>{date}</span>
      </div>
      <div className="review-rating">Calificacion:</div> {`${'⭐'.repeat(rating)}`}
      <p>{comment}</p>
    </div>
  );
};

const Reviews = () => {
  return (
    <>  <div className="header"><div className="titulo">La Tablita-Reseñas</div><Link to='/login'><div className="button">Iniciar sesion</div></Link>
    <Link to='/register'><div className="button">Registrarse</div></Link></div>
    <div className="reviews-container">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          name={review.name}
          date={review.date}
          rating={review.rating}
          comment={review.comment}
        />
      ))}
    </div>
     
   </>
  );
};

export default Reviews;
