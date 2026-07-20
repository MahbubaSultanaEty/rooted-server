import mongoose from 'mongoose';
const { Schema } = mongoose;

const MESSAGE_LIMIT = 50;

const messageSchema = new Schema({
  role:    { type: String, enum: ['user', 'assistant', 'system'], required: true },
  content: { type: String, required: true },

  toolCalls: { type: Schema.Types.Mixed, default: [] },
  suggestedFollowUps: [{ type: String }],

  createdAt: { type: Date, default: Date.now },
}, { _id: false });

const chatConversationSchema = new Schema({
  userId:    { type: Schema.Types.ObjectId, ref: 'User' },
  sessionId: { type: String, required: true, unique: true },

  messages:     [messageSchema],
  messageCount: { type: Number, default: 0 },
  isActive:     { type: Boolean, default: true },

  contextSnapshot: { type: Schema.Types.Mixed, default: {} },

  title:    { type: String },
  expiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } },
}, { timestamps: true });

chatConversationSchema.index({ userId: 1, updatedAt: -1 });
chatConversationSchema.index({ sessionId: 1 }, { unique: true });

export const ChatConversation = mongoose.model('ChatConversation', chatConversationSchema);
