"use client";

import { useState } from "react";
import { ShoppingBag, Heart, Eye } from "lucide-react";
import styles from "./ProductCard.module.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isNew: boolean;
  isLiveMade: boolean;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div 
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.imageContainer}>
        <div className={styles.imagePlaceholder}>
          <span className={styles.categoryLabel}>{product.category}</span>
        </div>
        
        {product.isNew && (
          <span className={styles.badgeNew}>New</span>
        )}
        
        {product.isLiveMade && (
          <span className={styles.badgeLive}>
            <span className={styles.liveDot} />
            Live Made
          </span>
        )}
        
        <div className={`${styles.overlay} ${isHovered ? styles.overlayVisible : ""}`}>
          <button className={styles.actionButton} aria-label="Quick view">
            <Eye size={20} />
          </button>
          <button 
            className={`${styles.actionButton} ${isLiked ? styles.liked : ""}`}
            onClick={() => setIsLiked(!isLiked)}
            aria-label="Add to wishlist"
          >
            <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{product.name}</h3>
          <span className={styles.price}>${product.price}</span>
        </div>
        
        <p className={styles.description}>{product.description}</p>
        
        <button className={styles.addToCart}>
          <ShoppingBag size={18} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
