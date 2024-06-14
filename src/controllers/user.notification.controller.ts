import { Request, Response } from 'express';
import Notification, { INotification } from '../models/user.Notification.model';

export const createNotification = async (req: Request, res: Response): Promise<void> => {
   try {
      const { event, message, sentBy, seen, time, date, isActive, images }: INotification = req.body;

      const notification: INotification = await Notification.create({
         event,
         message,
         sentBy,
         seen,
         time,
         date,
         isActive,
         images,
      });

      res.status(201).json({ success: true, message: 'Notification created successfully', notification });
   } catch (error) {
      console.error('Error creating notification:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
   }
};

// Get All Notification
export const getAllNotifications = async (req: Request, res: Response): Promise<void> => {
   try {
      const notifications: INotification[] = await Notification.find();
      res.status(200).json({ success: true, notifications });
   } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
   }
};

//get notification by id:
export const getNotificationById = async (req: Request, res: Response): Promise<void> => {
   try {
      const id: string = req.params.id;
      const notification: INotification | null = await Notification.findById(id);
      if (!notification) {
         res.status(404).json({ success: false, message: 'Notification not found' });
      } else {
         res.status(200).json({ success: true, notification });
      }
   } catch (error) {
      console.error('Error fetching notification by ID:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
   }
};
// Update Notification::::::::

export const updateNotificationById = async (req: Request, res: Response): Promise<void> => {
   try {
      const id: string = req.params.id;
      const { event, message, sentBy, seen, time, date, isActive, images }: Partial<INotification> = req.body;

      const existingNotification: INotification | null = await Notification.findById(id);
      if (!existingNotification) {
         res.status(404).json({ success: false, message: 'Notification not found' });
         return;
      }
      if (event) existingNotification.event = event;
      if (message) existingNotification.message = message;
      if (sentBy) existingNotification.sentBy = sentBy;
      if (seen !== undefined) existingNotification.seen = seen;
      if (time) existingNotification.time = time;
      if (date) existingNotification.date = date;
      if (isActive !== undefined) existingNotification.isActive = isActive;
      if (images) existingNotification.images = images;

      const updatedNotification: INotification = await existingNotification.save();

      res.status(200).json({ success: true, notification: updatedNotification });
   } catch (error) {
      console.error('Error updating notification:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
   }
};

// delete notification:
export const deleteNotificationById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: string = req.params.id;
        const notification: INotification | null = await Notification.findByIdAndDelete(id);

        if (!notification) {
            res.status(404).json({ success: false, message: 'Notification not found' });
        } else {
            res.status(200).json({ success: true, message: 'Notification deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};





