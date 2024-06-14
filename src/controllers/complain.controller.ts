import { Request, Response } from 'express';
import { ComplaintModel, IComplaint } from '../models/complain.model';

// Cereate A Complain :::::
export const createComplaint = async (req: Request, res: Response) => {
   try {
      const { userId, description, message } = req.body;
      const newComplaint: IComplaint = new ComplaintModel({
         userId,
         description,
         message,
      });
      await newComplaint.save();
      res.status(201).json({ message: 'Complaint created successfully', complaint: newComplaint });
   } catch (error) {
      console.error('Error creating complaint:', error);
      res.status(500).json({ error: 'Failed to create complaint' });
   }
};

// GET ALL COMPLAIN::
export const getAllComplaints = async (req: Request, res: Response) => {
   try {
      const complaints: IComplaint[] = await ComplaintModel.find().exec();
      res.status(200).json(complaints);
   } catch (error) {
      console.error('Error fetching complaints:', error);
      res.status(500).json({ error: 'Failed to fetch complaints' });
   }
};
// GET SINGLE COMPLAIN::
export const getComplaint = async (req: Request, res: Response) => {
   try {
      const id = req.params.id;
      const complaint: IComplaint | null = await ComplaintModel.findById(id).exec();
      if (!complaint) {
         res.status(404).json({ error: 'Complaint not found' });
      } else {
         res.status(200).json(complaint);
      }
   } catch (error) {
      console.error('Error fetching complaint:', error);
      res.status(500).json({ error: 'Failed to fetch complaint' });
   }
};
// update complain:::::::::::
export const updateComplaint = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      const { description, message } = req.body;

      if (!id) {
         return res.status(400).json({ error: 'Complaint ID is required' });
      }

      const complaint = await ComplaintModel.findById(id);

      if (!complaint) {
         return res.status(404).json({ error: 'Complaint not found' });
      }

      if (description) {
         complaint.description = description;
      }
      if (message) {
         complaint.message = message;
      }

      await complaint.save();

      // Respond with success messag
      res.status(200).json({ message: 'Complaint updated successfully', complaint });
   } catch (error) {
      console.error('Error updating complaint:', error);
      res.status(500).json({ error: 'Failed to update complaint' });
   }
};

export const deleteComplaint = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;

      if (!id) {
         return res.status(400).json({ error: 'Complaint ID is required' });
      }

      const deletedComplaint = await ComplaintModel.findByIdAndDelete(id);

      if (!deletedComplaint) {
         return res.status(404).json({ error: 'Complaint not found' });
      }

      res.status(200).json({ message: 'Complaint deleted successfully', deletedComplaint });
   } catch (error) {
      console.error('Error deleting complaint:', error);
      res.status(500).json({ error: 'Failed to delete complaint' });
   }
};
