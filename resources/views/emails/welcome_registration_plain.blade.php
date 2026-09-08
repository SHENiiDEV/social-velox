Welcome to Velox Play, {{ $user->name }}!

Your account has been successfully created.
Player User Code: {{ $user->user_code }}
Account Email: {{ $user->email }}
Account Balance: {{ number_format($user->game_balance, 2) }} SC

Start playing now: {{ url('/') }}

© 2026 Velox Entertainment N.V. All rights reserved.
