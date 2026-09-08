Coin Purchase Receipt - Velox Play

Hello {{ $user->name }},

Thank you for your purchase!
Order Reference ID: #{{ $orderId }}
User Code: {{ $user->user_code }}
Payment Amount: ${{ number_format($usdAmount, 2) }} USD
SC Granted: +{{ number_format($scGranted, 2) }} SC
Updated Total SC Balance: {{ number_format($newBalance, 2) }} SC

Return to Lobby: {{ url('/') }}

© 2026 Velox Entertainment N.V. All rights reserved.
