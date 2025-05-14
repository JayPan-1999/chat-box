/*!
 * Copyright 2024, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChatBox } from './ChatBox';

// Import Jest types
import type { jest } from '@jest/globals';

// Mocking MUI icons
jest.mock('@mui/icons-material', () => ({
    ThumbUp: () => <div data-testid="thumb-up-icon" />,
    ThumbDown: () => <div data-testid="thumb-down-icon" />,
    AttachFile: () => <div data-testid="attach-file-icon" />,
    KeyboardArrowUp: () => <div data-testid="keyboard-arrow-up-icon" />,
    Send: () => <div data-testid="send-icon" />
}));

describe('ChatBox', () => {
    test('renders trigger button when showTriggerButton is true', () => {
        render(<ChatBox showTriggerButton={true} />);
        const triggerButton = screen.getByTestId('keyboard-arrow-up-icon').closest('button');
        expect(triggerButton).toBeInTheDocument();
    });

    test('does not render trigger button when showTriggerButton is false', () => {
        render(<ChatBox showTriggerButton={false} />);
        const triggerButton = screen.queryByTestId('keyboard-arrow-up-icon');
        expect(triggerButton).not.toBeInTheDocument();
    });

    test('shows chat window when initialVisible is true', () => {
        render(<ChatBox initialVisible={true} />);
        const chatWindow = screen.getByRole('textbox');
        expect(chatWindow).toBeVisible();
    });

    test('displays welcome message', () => {
        const welcomeMessage = 'Welcome to the test chat!';
        render(<ChatBox welcomeMessage={welcomeMessage} initialVisible={true} />);

        // The welcome message should be displayed
        const messageElement = screen.getByText(welcomeMessage);
        expect(messageElement).toBeInTheDocument();
    });

    test('sends a message when user types and clicks send', () => {
        const onSendMessage = jest.fn();
        render(<ChatBox onSendMessage={onSendMessage} initialVisible={true} />);

        // Type a message
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'Hello world' } });

        // Click send button
        const sendButton = screen.getByTestId('send-icon').closest('button');
        fireEvent.click(sendButton!);

        // Check if onSendMessage was called with the correct message
        expect(onSendMessage).toHaveBeenCalledWith('Hello world');

        // The sent message should appear in the chat
        const messageElement = screen.getByText('Hello world');
        expect(messageElement).toBeInTheDocument();
    });

    test('calls onFeedback when user clicks feedback buttons', () => {
        const onFeedback = jest.fn();
        render(<ChatBox onFeedback={onFeedback} initialVisible={true} />);

        // Wait for the welcome message to appear
        const welcomeMessage = screen.getByText('Hello! How can I help you today?');
        expect(welcomeMessage).toBeInTheDocument();

        // Find the thumbs up button
        const thumbUpButton = screen.getByTestId('thumb-up-icon').closest('div');
        fireEvent.click(thumbUpButton!);

        // Check if onFeedback was called
        expect(onFeedback).toHaveBeenCalledWith(expect.any(String), 'like');
    });
}); 