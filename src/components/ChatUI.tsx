import React, { useState, useRef, useEffect } from 'react';
import Chat, { Bubble, IconButtonProps, ToolbarItemProps, useMessages } from '@chatui/core';
import '@chatui/core/dist/index.css';
import { ThumbUp, ThumbDown, KeyboardArrowUp, AttachFile } from '@mui/icons-material';
import './ChatUI.css';

// Props for our ChatUI component
export interface ChatUIProps {
    initialVisible?: boolean;
    showTriggerButton?: boolean;
    title?: string;
    placeholder?: string;
    welcomeMessage?: string;
    onSendMessage?: (message: string) => void;
    onFileUpload?: (file: File) => void;
    onFeedback?: (messageId: string, feedback: 'like' | 'dislike') => void;
}

export const ChatUI: React.FC<ChatUIProps> = ({
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
    const { messages, appendMsg, updateMsg } = useMessages([]);
    const [isTyping, setTyping] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Add welcome message when component mounts
    useEffect(() => {
        if (messages.length === 0 && welcomeMessage) {
            appendMsg({
                type: 'text',
                content: { text: welcomeMessage },
                position: 'left',
            });
        }
    }, []);

    // Handle sending a text message
    const handleSend = (type: string, content: string) => {
        if (type === 'text' && content.trim()) {
            // Add user message to the chat
            appendMsg({
                type: 'text',
                content: { text: content },
                position: 'right',
            });

            // Call the onSendMessage callback
            if (onSendMessage) {
                onSendMessage(content);
            }

            // Demo response - replace with actual API integration
            setTyping(true);
            setTimeout(() => {
                setTyping(false);
                appendMsg({
                    type: 'text',
                    content: { text: 'This is a mock response. Replace with actual API integration.' },
                    position: 'left',
                });
            }, 1000);
        }
    };

    // Handle file selection
    const handleFileSelect = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Handle file upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];

            // Add file message
            appendMsg({
                type: 'file',
                content: { text: `File: ${file.name}` },
                position: 'right',
            });

            // Call the onFileUpload callback
            if (onFileUpload) {
                onFileUpload(file);
            }
        }
    };

    // Handle feedback (like/dislike)
    const handleFeedback = (msgId: string, feedback: 'like' | 'dislike') => {
        // Find the message in state
        const msgIndex = messages.findIndex(msg => msg._id === msgId);
        if (msgIndex !== -1) {
            // Store the current feedback value
            const currentFeedback = messages[msgIndex].hasOwnProperty('feedback')
                ? (messages[msgIndex] as any).feedback
                : undefined;

            // Only update if feedback is different
            if (currentFeedback !== feedback) {
                // Create a copy with the updated feedback
                const updatedMsg = {
                    ...messages[msgIndex],
                    feedback
                };

                // Update in state (might need typing adjustments depending on ChatUI's API)
                updateMsg(msgId, {
                    type: updatedMsg.type,
                    content: updatedMsg.content,
                    position: updatedMsg.position
                });

                // Call the feedback callback
                if (onFeedback) {
                    onFeedback(msgId, feedback);
                }
            }
        }
    };

    // Custom renderer for messages to add feedback buttons
    const renderMessageContent = (msg: any) => {
        return (
            <div>
                {msg.type === 'file' ? (
                    <div className="file-message">
                        <AttachFile className="file-icon" fontSize="small" />
                        <Bubble content={msg.content.text} />
                    </div>
                ) : (
                    <Bubble content={msg.content.text} />
                )}

                {msg.position === 'left' && (
                    <div className="feedback-buttons">
                        <ThumbUp
                            fontSize="small"
                            color={msg.feedback === 'like' ? 'primary' : 'action'}
                            onClick={() => handleFeedback(msg._id, 'like')}
                            style={{ cursor: 'pointer' }}
                        />
                        <ThumbDown
                            fontSize="small"
                            color={msg.feedback === 'dislike' ? 'primary' : 'action'}
                            onClick={() => handleFeedback(msg._id, 'dislike')}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                )}
            </div>
        );
    };

    // Toolbar items including file upload
    const toolbar: ToolbarItemProps[] = [
        {
            type: 'button',
            icon: 'file',
            title: 'Upload file',
        },
    ];

    const handleToolbarClick = (item: ToolbarItemProps, event: React.MouseEvent): void => {
        console.log(item);
        if (item.icon === 'file') {
            handleFileSelect()
        }
    }

    return (
        <div>
            {showTriggerButton && (
                <button
                    onClick={() => setVisible(!visible)}
                    className="chat-trigger-button"
                >
                    <KeyboardArrowUp
                        className="icon"
                        style={{
                            transform: visible ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                    />
                </button>
            )}

            <div
                className="chat-container"
                style={{
                    bottom: showTriggerButton ? '90px' : '0',
                    display: visible ? 'block' : 'none',
                }}
            >
                <Chat
                    navbar={{ title }}
                    messages={messages}
                    renderMessageContent={renderMessageContent}
                    onSend={handleSend}
                    placeholder={placeholder}
                    locale="en-US"
                    toolbar={toolbar}
                    onToolbarClick={handleToolbarClick}
                    loadMoreText="Load More"
                />
            </div>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
        </div>
    );
};

export default ChatUI;