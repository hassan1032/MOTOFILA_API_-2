import { Request, Response } from 'express';
import Review, { IReview } from '../models/review.model';

// Create a review
export const createReview = async (req: Request, res: Response): Promise<void> => {
   try {
      const { description, rating, images, userId, parkingId } = req.body;
      const newReview: IReview = new Review({
         description,
         rating,
         images,
         isActive: true,
         userId,
         parkingId,
      });
      const savedReview: IReview = await newReview.save();
      res.status(201).json({message:"successfully created", savedReview});
   } catch (error) {
      res.status(400).json({ message: (error as Error).message });
   }
};

// get all review
export const getAllReviews = async (req: Request, res: Response): Promise<void> => {
   try {
      const reviews: IReview[] = await Review.find();
      res.status(200).json(reviews);
   } catch (error) {
      res.status(500).json({ message: (error as Error).message });
   }
};

// get review by id:

export const getReviewById = async (req: Request, res: Response): Promise<void> => {
   try {
      const { id } = req.params;
      const review: IReview | null = await Review.findById(id);
      if (!review) {
         res.status(404).json({ message: 'Review not found' });
         return;
      }
      res.status(200).json(review);
   } catch (error) {
      res.status(500).json({ message: (error as Error).message });
   }
};

// Update Review

export const updateReview = async (req: Request, res: Response): Promise<void> => {
   try {
      const { id } = req.params;
      const updatedReview: IReview | null = await Review.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedReview) {
         res.status(404).json({ message: 'Review not found' });
         return;
      }
      res.status(200).json({message:"Update successfully",updatedReview});
   } catch (error) {
      res.status(400).json({ message: (error as Error).message });
   }
};
export const deleteReview = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedReview: IReview | null = await Review.findByIdAndDelete(id);
        if (!deletedReview) {
           res.status(404).json({ message: 'Review not found' });
           return;
        }
        res.status(204).json({ message: ' Deleted successfully' });
     } catch (error) {
        res.status(400).json({ message: (error as Error).message });
     }
  };
