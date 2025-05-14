import React, { useState, useRef, useEffect } from 'react';
import { ThumbUp, ThumbDown, AttachFile, KeyboardArrowUp, Send } from '@mui/icons-material';

export interface ChatMessage {
    id: string;
    type: 'text' | 'file';
    content: string;
    position: 'left' | 'right';
    timestamp: Date;
    feedback?: 'like' | 'dislike';
    fileInfo?: {
        name: string;
        size: number;
        type: string;
    };
}

export interface ChatBoxProps {
    initialVisible?: boolean;
    showTriggerButton?: boolean;
    title?: string;
    placeholder?: string;
    welcomeMessage?: string;
    onSendMessage?: (message: string) => void;
    onFileUpload?: (file: File) => void;
    onFeedback?: (messageId: string, feedback: 'like' | 'dislike') => void;
}

export const ChatBox: React.FC<ChatBoxProps> = ({
    initialVisible = false,
    showTriggerButton = true,
    title = 'Chat',
    placeholder = 'Please enter your message...',
    welcomeMessage = 'Hello! How can I help you today?',
    onSendMessage,
    onFileUpload,
    onFeedback,
}) => {
    const [visible, setVisible] = useState(initialVisible);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Add welcome message
    useEffect(() => {
        if (messages.length === 0 && welcomeMessage) {
            addMessage({
                id: generateId(),
                type: 'text',
                content: welcomeMessage,
                position: 'left',
                timestamp: new Date(),
            });
        }
    }, []);

    // Scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const generateId = () => {
        return Math.random().toString(36).substring(2, 15);
    };

    const addMessage = (message: ChatMessage) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            const newMessage: ChatMessage = {
                id: generateId(),
                type: 'text',
                content: inputValue,
                position: 'right',
                timestamp: new Date(),
            };

            addMessage(newMessage);

            if (onSendMessage) {
                onSendMessage(inputValue);
            }

            setInputValue('');

            // Mock response (to be replaced with actual API call)
            setTimeout(() => {
                addMessage({
                    id: generateId(),
                    type: 'text',
                    content: 'This is a mock response. Replace with actual API integration.',
                    position: 'left',
                    timestamp: new Date(),
                });
            }, 1000);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleFileSelect = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];

            // Add file message
            const newMessage: ChatMessage = {
                id: generateId(),
                type: 'file',
                content: `File: ${file.name}`,
                position: 'right',
                timestamp: new Date(),
                fileInfo: {
                    name: file.name,
                    size: file.size,
                    type: file.type
                }
            };

            addMessage(newMessage);

            // Call the onFileUpload callback
            if (onFileUpload) {
                onFileUpload(file);
            }
        }
    };

    const handleFeedback = (messageId: string, type: 'like' | 'dislike') => {
        setMessages((prevMessages) =>
            prevMessages.map((msg) =>
                msg.id === messageId ? { ...msg, feedback: type } : msg
            )
        );

        if (onFeedback) {
            onFeedback(messageId, type);
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Render message bubble
    const renderMessage = (message: ChatMessage) => {
        const isUser = message.position === 'right';

        return (
            <div
                key={message.id}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isUser ? 'flex-end' : 'flex-start',
                    marginBottom: '16px',
                }}
            >
                <div
                    style={{
                        maxWidth: '70%',
                        padding: '12px 16px',
                        borderRadius: isUser ? '18px 18px 0 18px' : '18px 18px 18px 0',
                        backgroundColor: isUser ? '#1976d2' : '#f0f0f0',
                        color: isUser ? 'white' : 'black',
                        overflowWrap: 'break-word',
                    }}
                >
                    {message.type === 'file' ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <AttachFile fontSize="small" />
                            <span>{message.content}</span>
                        </div>
                    ) : (
                        <div>{message.content}</div>
                    )}
                </div>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginTop: '4px',
                        fontSize: '12px',
                        color: '#888',
                    }}
                >
                    <span>{formatTime(message.timestamp)}</span>

                    {!isUser && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <ThumbUp
                                fontSize="small"
                                color={message.feedback === 'like' ? 'primary' : 'action'}
                                onClick={() => handleFeedback(message.id, 'like')}
                                style={{ cursor: 'pointer' }}
                            />
                            <ThumbDown
                                fontSize="small"
                                color={message.feedback === 'dislike' ? 'primary' : 'action'}
                                onClick={() => handleFeedback(message.id, 'dislike')}
                                style={{ cursor: 'pointer' }}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div style={{ position: 'relative' }}>
            {showTriggerButton && (
                <button
                    onClick={() => setVisible(!visible)}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: '#1976d2',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        cursor: 'pointer',
                        zIndex: 1000,
                    }}
                >
                    <KeyboardArrowUp
                        style={{
                            transform: visible ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s'
                        }}
                    />
                </button>
            )}

            <div
                style={{
                    position: 'fixed',
                    bottom: showTriggerButton ? '90px' : '0',
                    right: '20px',
                    width: '350px',
                    height: '500px',
                    backgroundColor: 'white',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    display: visible ? 'flex' : 'none',
                    flexDirection: 'column',
                    zIndex: 999,
                }}
            >
                {/* Header */}
                <div
                    style={{
                        padding: '16px',
                        borderBottom: '1px solid #eaeaea',
                        backgroundColor: '#1976d2',
                        color: 'white',
                        fontWeight: 'bold',
                    }}
                >
                    {title}
                </div>

                {/* Messages Container */}
                <div
                    style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '16px',
                        backgroundColor: '#ffffff',
                    }}
                >
                    {messages.map(renderMessage)}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px 16px',
                        borderTop: '1px solid #eaeaea',
                        backgroundColor: '#f9f9f9',
                    }}
                >
                    <button
                        onClick={handleFileSelect}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#666',
                            marginRight: '8px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <AttachFile />
                    </button>

                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder={placeholder}
                        style={{
                            flex: 1,
                            padding: '10px 12px',
                            border: '1px solid #ddd',
                            borderRadius: '20px',
                            fontSize: '14px',
                            outline: 'none',
                        }}
                    />

                    <button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim()}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: inputValue.trim() ? 'pointer' : 'default',
                            color: inputValue.trim() ? '#1976d2' : '#ccc',
                            marginLeft: '8px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Send />
                    </button>

                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChatBox; 