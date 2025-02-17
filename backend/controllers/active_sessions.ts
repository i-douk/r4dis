const sessionRouter = require("express").Router();
import express from 'express';
import { supabase } from '../utils/db';
import jwt from 'jsonwebtoken';
import models from '../models';
import config from '../utils/config';

const router = express.Router();

// Endpoint to create a session from Supabase JWT
router.post('/', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    // Validate the Supabase JWT
    const { data: user, error } = await supabase.auth.getUser(token);

    if (error) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Check if the user already has an active session
    const existingSession = await models.ActiveUserSession({where : { user_id: user.user.id }});

    if (existingSession) {
      return res.status(200).json({ message: 'Session already exists' });
    }

    // Create a new session in your custom table
    await models.ActiveUserSession.create({
      token: jwt.sign({ id: user.user.id }, config.SECRET),
      user_id: user.user.id,
      role: 'user',
    });

    res.status(201).json({ message: 'Session created successfully' });
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default sessionRouter;