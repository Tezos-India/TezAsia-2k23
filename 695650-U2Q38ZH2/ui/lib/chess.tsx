

var Chess = function (fen) {
  var BLACK = 'b'
  var WHITE = 'w'
  var EMPTY = -1
  var PAWN = 'p'
  var KNIGHT = 'n'
  var BISHOP = 'b'
  var ROOK = 'r'
  var QUEEN = 'q'
  var KING = 'k'
  

  var SYMBOLS = 'pnbrqkPNBRQK'

  var DEFAULT_POSITION =
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

  var TERMINATION_MARKERS = ['1-0', '0-1', '1/2-1/2', '*']
interface Move {
    from: string;
    to: string;
    flags: number; // This should be the correct type for your flags property
    // Other properties...
}
  const PAWN_OFFSETS: { [key: string]: number[] } = {
    b: [16, 32, 17, 15],
    w: [-16, -32, -17, -15],
  };
  
  const PIECE_OFFSETS: { [key: string]: number[] } = {
    n: [-18, -33, -31, -14, 18, 33, 31, 14],
    b: [-17, -15, 17, 15],
    r: [-16, 1, 16, -1],
    q: [-17, -16, -15, 1, 17, 16, 15, -1],
    k: [-17, -16, -15, 1, 17, 16, 15, -1],
  };

  // prettier-ignore
  var ATTACKS = [
    20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20, 0,
     0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
     0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
     0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
     0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
    24,24,24,24,24,24,56,  0, 56,24,24,24,24,24,24, 0,
     0, 0, 0, 0, 0, 2,53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0, 0,20, 2, 24,  2,20, 0, 0, 0, 0, 0, 0,
     0, 0, 0, 0,20, 0, 0, 24,  0, 0,20, 0, 0, 0, 0, 0,
     0, 0, 0,20, 0, 0, 0, 24,  0, 0, 0,20, 0, 0, 0, 0,
     0, 0,20, 0, 0, 0, 0, 24,  0, 0, 0, 0,20, 0, 0, 0,
     0,20, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0,20, 0, 0,
    20, 0, 0, 0, 0, 0, 0, 24,  0, 0, 0, 0, 0, 0,20
  ];
  interface PieceCounts {
    [pieceType: string]: number;
  }
  var pieces: PieceCounts = {};
  // prettier-ignore
  var RAYS = [
     17,  0,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0,  0, 15, 0,
      0, 17,  0,  0,  0,  0,  0, 16,  0,  0,  0,  0,  0, 15,  0, 0,
      0,  0, 17,  0,  0,  0,  0, 16,  0,  0,  0,  0, 15,  0,  0, 0,
      0,  0,  0, 17,  0,  0,  0, 16,  0,  0,  0, 15,  0,  0,  0, 0,
      0,  0,  0,  0, 17,  0,  0, 16,  0,  0, 15,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0, 17,  0, 16,  0, 15,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0,  0, 17, 16, 15,  0,  0,  0,  0,  0,  0, 0,
      1,  1,  1,  1,  1,  1,  1,  0, -1, -1,  -1,-1, -1, -1, -1, 0,
      0,  0,  0,  0,  0,  0,-15,-16,-17,  0,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,  0,-15,  0,-16,  0,-17,  0,  0,  0,  0,  0, 0,
      0,  0,  0,  0,-15,  0,  0,-16,  0,  0,-17,  0,  0,  0,  0, 0,
      0,  0,  0,-15,  0,  0,  0,-16,  0,  0,  0,-17,  0,  0,  0, 0,
      0,  0,-15,  0,  0,  0,  0,-16,  0,  0,  0,  0,-17,  0,  0, 0,
      0,-15,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,-17,  0, 0,
    -15,  0,  0,  0,  0,  0,  0,-16,  0,  0,  0,  0,  0,  0,-17
  ];

  interface ChessState {
    move: any;
    kings: any;
    turn: any;
    castling: any;
    ep_square: any;
    half_moves: any;
    move_number: any;
  }
  let history: ChessState[] = [];
  interface Shifts {
    p: number;
    n: number;
    b: number;
    r: number;
    q: number;
    k: number;
  }
  
  const SHIFTS: Shifts = { p: 0, n: 1, b: 2, r: 3, q: 4, k: 5 };
  
  interface Flags {
    NORMAL: string;
    CAPTURE: string;
    BIG_PAWN: string;
    EP_CAPTURE: string;
    PROMOTION: string;
    KSIDE_CASTLE: string;
    QSIDE_CASTLE: string;
  }
  
  const FLAGS: Flags = {
    NORMAL: 'n',
    CAPTURE: 'c',
    BIG_PAWN: 'b',
    EP_CAPTURE: 'e',
    PROMOTION: 'p',
    KSIDE_CASTLE: 'k',
    QSIDE_CASTLE: 'q',
  };
  
  
  
  interface Bits {
    NORMAL: number;
    CAPTURE: number;
    BIG_PAWN: number;
    EP_CAPTURE: number;
    PROMOTION: number;
    KSIDE_CASTLE: number;
    QSIDE_CASTLE: number;
  }
  
  const BITS: Bits = {
    NORMAL: 1,
    CAPTURE: 2,
    BIG_PAWN: 4,
    EP_CAPTURE: 8,
    PROMOTION: 16,
    KSIDE_CASTLE: 32,
    QSIDE_CASTLE: 64,
  };
  
  var RANK_1 = 7
  var RANK_2 = 6
  var RANK_3 = 5
  var RANK_4 = 4
  var RANK_5 = 3
  var RANK_6 = 2
  var RANK_7 = 1
  var RANK_8 = 0

  // prettier-ignore
 const SQUARES: { [key: string]: number } = {
    a8:   0, b8:   1, c8:   2, d8:   3, e8:   4, f8:   5, g8:   6, h8:   7,
    a7:  16, b7:  17, c7:  18, d7:  19, e7:  20, f7:  21, g7:  22, h7:  23,
    a6:  32, b6:  33, c6:  34, d6:  35, e6:  36, f6:  37, g6:  38, h6:  39,
    a5:  48, b5:  49, c5:  50, d5:  51, e5:  52, f5:  53, g5:  54, h5:  55,
    a4:  64, b4:  65, c4:  66, d4:  67, e4:  68, f4:  69, g4:  70, h4:  71,
    a3:  80, b3:  81, c3:  82, d3:  83, e3:  84, f3:  85, g3:  86, h3:  87,
    a2:  96, b2:  97, c2:  98, d2:  99, e2: 100, f2: 101, g2: 102, h2: 103,
    a1: 112, b1: 113, c1: 114, d1: 115, e1: 116, f1: 117, g1: 118, h1: 119
  };

  interface CastlingFlags {
    w: number;
    b: number;
    [key: string]: number; // Add this index signature
  }
  
  interface RookData {
    square: number;
    flag: number;
  }
  
  var castling: CastlingFlags = { w: 0, b: 0 };
  
  var ROOKS: { [color: string]: RookData[] } = {
    w: [
      { square: SQUARES.a1, flag: BITS.QSIDE_CASTLE },
      { square: SQUARES.h1, flag: BITS.KSIDE_CASTLE },
    ],
    b: [
      { square: SQUARES.a8, flag: BITS.QSIDE_CASTLE },
      { square: SQUARES.h8, flag: BITS.KSIDE_CASTLE },
    ],
  };

  let board = new Array(128);
  let kings: { w: number; b: number } = { w: EMPTY, b: EMPTY };

  let turn = WHITE;
 
  let ep_square = EMPTY;
  let half_moves = 0;
  let move_number = 1;
  
  let header: { [key: string]: any } = {};
  let comments: { [key: string]: any } = {};

  if (typeof fen === 'undefined') {
    load(DEFAULT_POSITION, true); // Assuming true is the value for 'keepHeaders'
  } else {
    load(fen, true); // Assuming true is the value for 'keepHeaders'
  }


  function clear(keep_headers: any) {
    if (typeof keep_headers === 'undefined') {
      keep_headers = false;
    }
  
    board = new Array(128);
    kings = { w: EMPTY, b: EMPTY }; // Move kings declaration here
    turn = WHITE;
    castling = { w: 0, b: 0 };
    ep_square = EMPTY;
    half_moves = 0;
    move_number = 1;
    history = [];
    if (!keep_headers) header = {};
    comments = {};
    update_setup(generate_fen());
  }

  function prune_comments() {
    var reversed_history: string[] = []; // Assuming that the type of history is string[]
    var current_comments: { [fen: string]: any } = {}; // Use the actual type instead of 'any'
  
    var copy_comment = function (fen: string) {
      if (fen in comments) {
        current_comments[fen] = comments[fen];
      }
    };
  
    while (history.length > 0) {
      reversed_history.push(undo_move());
    }
  
    copy_comment(generate_fen());
  
    while (reversed_history.length > 0) {
      make_move(reversed_history.pop());
      copy_comment(generate_fen());
    }
  
    comments = current_comments;
  }
 function reset() {
  load(DEFAULT_POSITION, true);
}


  function load(fen:any, keep_headers:any) {
    if (typeof keep_headers === 'undefined') {
      keep_headers = false
    }

    var tokens = fen.split(/\s+/)
    var position = tokens[0]
    var square = 0

    if (!validate_fen(fen).valid) {
      return false
    }

    clear(keep_headers)

    for (var i = 0; i < position.length; i++) {
      var piece = position.charAt(i)

      if (piece === '/') {
        square += 8
      } else if (is_digit(piece)) {
        square += parseInt(piece, 10)
      } else {
        var color = piece < 'a' ? WHITE : BLACK
        put({ type: piece.toLowerCase(), color: color }, algebraic(square))
        square++
      }
    }

    turn = tokens[1]

    if (tokens[2].indexOf('K') > -1) {
      castling.w |= BITS.KSIDE_CASTLE
    }
    if (tokens[2].indexOf('Q') > -1) {
      castling.w |= BITS.QSIDE_CASTLE
    }
    if (tokens[2].indexOf('k') > -1) {
      castling.b |= BITS.KSIDE_CASTLE
    }
    if (tokens[2].indexOf('q') > -1) {
      castling.b |= BITS.QSIDE_CASTLE
    }

    ep_square = tokens[3] === '-' ? EMPTY : SQUARES[tokens[3]]
    half_moves = parseInt(tokens[4], 10)
    move_number = parseInt(tokens[5], 10)

    update_setup(generate_fen())

    return true
  }

 
  function validate_fen(fen:any) {
    var errors = {
      0: 'No errors.',
      1: 'FEN string must contain six space-delimited fields.',
      2: '6th field (move number) must be a positive integer.',
      3: '5th field (half move counter) must be a non-negative integer.',
      4: '4th field (en-passant square) is invalid.',
      5: '3rd field (castling availability) is invalid.',
      6: '2nd field (side to move) is invalid.',
      7: "1st field (piece positions) does not contain 8 '/'-delimited rows.",
      8: '1st field (piece positions) is invalid [consecutive numbers].',
      9: '1st field (piece positions) is invalid [invalid piece].',
      10: '1st field (piece positions) is invalid [row too large].',
      11: 'Illegal en-passant square',
    }

   
    var tokens = fen.split(/\s+/)
    if (tokens.length !== 6) {
      return { valid: false, error_number: 1, error: errors[1] }
    }

    if (isNaN(tokens[5]) || parseInt(tokens[5], 10) <= 0) {
      return { valid: false, error_number: 2, error: errors[2] }
    }

  
    if (isNaN(tokens[4]) || parseInt(tokens[4], 10) < 0) {
      return { valid: false, error_number: 3, error: errors[3] }
    }

   
    if (!/^(-|[abcdefgh][36])$/.test(tokens[3])) {
      return { valid: false, error_number: 4, error: errors[4] }
    }


    if (!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(tokens[2])) {
      return { valid: false, error_number: 5, error: errors[5] }
    }

    if (!/^(w|b)$/.test(tokens[1])) {
      return { valid: false, error_number: 6, error: errors[6] }
    }

   
    var rows = tokens[0].split('/')
    if (rows.length !== 8) {
      return { valid: false, error_number: 7, error: errors[7] }
    }


    for (var i = 0; i < rows.length; i++) {
 
      var sum_fields = 0
      var previous_was_number = false

      for (var k = 0; k < rows[i].length; k++) {
        if (!isNaN(rows[i][k])) {
          if (previous_was_number) {
            return { valid: false, error_number: 8, error: errors[8] }
          }
          sum_fields += parseInt(rows[i][k], 10)
          previous_was_number = true
        } else {
          if (!/^[prnbqkPRNBQK]$/.test(rows[i][k])) {
            return { valid: false, error_number: 9, error: errors[9] }
          }
          sum_fields += 1
          previous_was_number = false
        }
      }
      if (sum_fields !== 8) {
        return { valid: false, error_number: 10, error: errors[10] }
      }
    }

    if (
      (tokens[3][1] == '3' && tokens[1] == 'w') ||
      (tokens[3][1] == '6' && tokens[1] == 'b')
    ) {
      return { valid: false, error_number: 11, error: errors[11] }
    }


    return { valid: true, error_number: 0, error: errors[0] }
  }

  function generate_fen() {
    var empty = 0
    var fen = ''

    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      if (board[i] == null) {
        empty++
      } else {
        if (empty > 0) {
          fen += empty
          empty = 0
        }
        var color = board[i].color
        var piece = board[i].type

        fen += color === WHITE ? piece.toUpperCase() : piece.toLowerCase()
      }

      if ((i + 1) & 0x88) {
        if (empty > 0) {
          fen += empty
        }

        if (i !== SQUARES.h1) {
          fen += '/'
        }

        empty = 0
        i += 8
      }
    }
type Color = 'w' | 'b';

interface CastlingFlags {
  w: number;
  b: number;
}



var cflags = '';

if (castling[WHITE] & BITS.KSIDE_CASTLE) {
  cflags += 'K';
}
if (castling[WHITE] & BITS.QSIDE_CASTLE) {
  cflags += 'Q';
}
if (castling[BLACK] & BITS.KSIDE_CASTLE) {
  cflags += 'k';
}
if (castling[BLACK] & BITS.QSIDE_CASTLE) {
  cflags += 'q';
}

    cflags = cflags || '-'
    var epflags = ep_square === EMPTY ? '-' : algebraic(ep_square)

    return [fen, turn, cflags, epflags, half_moves, move_number].join(' ')
  }

  function set_header(args:any) {
    for (var i = 0; i < args.length; i += 2) {
      if (typeof args[i] === 'string' && typeof args[i + 1] === 'string') {
        header[args[i]] = args[i + 1]
      }
    }
    return header
  }


  function update_setup(fen:any) {
    if (history.length > 0) return

    if (fen !== DEFAULT_POSITION) {
      header['SetUp'] = '1'
      header['FEN'] = fen
    } else {
      delete header['SetUp']
      delete header['FEN']
    }
  }

  function get(square:any) {
    var piece = board[SQUARES[square]]
    return piece ? { type: piece.type, color: piece.color } : null
  }

  function put(piece:any, square:any) {

    if (!('type' in piece && 'color' in piece)) {
      return false
    }


    if (SYMBOLS.indexOf(piece.type.toLowerCase()) === -1) {
      return false
    }

   
    if (!(square in SQUARES)) {
      return false
    }

    var sq = SQUARES[square]

    interface Kings {
      w: number;
      b: number;
    }
    if (
      piece.type == KING &&
      !(kings[piece.color as keyof Kings] == EMPTY || kings[piece.color as keyof Kings] == sq)
    ) {
      return false;
    }

    board[sq] = { type: piece.type, color: piece.color }
    if (piece.type === KING) {
      kings[piece.color] = sq
    }

    update_setup(generate_fen())

    return true
  }

  function remove(square: string) {
    var piece = get(square);
    board[SQUARES[square]] = null;
    if (piece && piece.type === KING) {
      kings[piece.color] = EMPTY;
    }
  
    update_setup(generate_fen());
  
    return piece;
  }
  

  function build_move(board: any, from: any, to: any, flags: any, promotion: any) {
    var move: any = {
      color: turn,
      from: from,
      to: to,
      flags: flags,
      piece: board[from].type,
    };
  
    if (promotion) {
      move.flags |= BITS.PROMOTION;
      move.promotion = promotion;
    }
  
    if (board[to]) {
      move.captured = board[to].type;
    } else if (flags & BITS.EP_CAPTURE) {
      move.captured = PAWN;
    }
  
    return move;
  }
  

  function generate_moves(options: any) {
  function add_move(board: any, moves: any[], from: any, to: any, flags: any) {
    
      if (
        board[from].type === PAWN &&
        (rank(to) === RANK_8 || rank(to) === RANK_1)
      ) {
        var pieces = [QUEEN, ROOK, BISHOP, KNIGHT]
        for (var i = 0, len = pieces.length; i < len; i++) {
          moves.push(build_move(board, from, to, flags, pieces[i]))
        }
      } else {
        moves.push(build_move(board, from, to, flags, null));
      }
    }

    var moves: any[] = []; // Initialize an empty array
    var us = turn; // Assuming 'turn' is defined elsewhere
    var them = swap_color(us); // Assuming 'swap_color' is defined elsewhere
    var second_rank: { [key: string]: number } = { b: RANK_7, w: RANK_2 }; // Initialize an object with number values
    
    var first_sq = SQUARES.a8; // Assuming 'SQUARES' is defined elsewhere
    var last_sq = SQUARES.h1; // Assuming 'SQUARES' is defined elsewhere
    var single_square = false; // Initialize a boolean variable
    

    var legal =
      typeof options !== 'undefined' && 'legal' in options
        ? options.legal
        : true

    var piece_type =
      typeof options !== 'undefined' &&
      'piece' in options &&
      typeof options.piece === 'string'
        ? options.piece.toLowerCase()
        : true

    if (typeof options !== 'undefined' && 'square' in options) {
      if (options.square in SQUARES) {
        first_sq = last_sq = SQUARES[options.square]
        single_square = true
      } else {
        /* invalid square */
        return []
      }
    }

    for (var i = first_sq; i <= last_sq; i++) {

      if (i & 0x88) {
        i += 7
        continue
      }

      var piece = board[i]
      if (piece == null || piece.color !== us) {
        continue
      }

      if (piece.type === PAWN && (piece_type === true || piece_type === PAWN)) {
     
        var square = i + PAWN_OFFSETS[us][0]
        if (board[square] == null) {
          add_move(board, moves, i, square, BITS.NORMAL)

      
          var square = i + PAWN_OFFSETS[us][1]
          if (second_rank[us] === rank(i) && board[square] == null) {
            add_move(board, moves, i, square, BITS.BIG_PAWN)
          }
        }


        for (j = 2; j < 4; j++) {
          var square = i + PAWN_OFFSETS[us][j]
          if (square & 0x88) continue

          if (board[square] != null && board[square].color === them) {
            add_move(board, moves, i, square, BITS.CAPTURE)
          } else if (square === ep_square) {
            add_move(board, moves, i, ep_square, BITS.EP_CAPTURE)
          }
        }
      } else if (piece_type === true || piece_type === piece.type) {
        for (var j = 0, len = PIECE_OFFSETS[piece.type].length; j < len; j++) {
          var offset = PIECE_OFFSETS[piece.type][j]
          var square = i

          while (true) {
            square += offset
            if (square & 0x88) break

            if (board[square] == null) {
              add_move(board, moves, i, square, BITS.NORMAL)
            } else {
              if (board[square].color === us) break
              add_move(board, moves, i, square, BITS.CAPTURE)
              break
            }

            /* break, if knight or king */
            if (piece.type === 'n' || piece.type === 'k') break
          }
        }
      }
    }

  
    if (piece_type === true || piece_type === KING) {
      if (!single_square || last_sq === kings[us]) {
        /* king-side castling */
        if (castling[us] & BITS.KSIDE_CASTLE) {
          var castling_from = kings[us]
          var castling_to = castling_from + 2

          if (
            board[castling_from + 1] == null &&
            board[castling_to] == null &&
            !attacked(them, kings[us]) &&
            !attacked(them, castling_from + 1) &&
            !attacked(them, castling_to)
          ) {
            add_move(board, moves, kings[us], castling_to, BITS.KSIDE_CASTLE)
          }
        }

      
        if (castling[us] & BITS.QSIDE_CASTLE) {
          var castling_from = kings[us]
          var castling_to = castling_from - 2

          if (
            board[castling_from - 1] == null &&
            board[castling_from - 2] == null &&
            board[castling_from - 3] == null &&
            !attacked(them, kings[us]) &&
            !attacked(them, castling_from - 1) &&
            !attacked(them, castling_to)
          ) {
            add_move(board, moves, kings[us], castling_to, BITS.QSIDE_CASTLE)
          }
        }
      }
    }

    
    if (!legal) {
      return moves
    }

  
    var legal_moves = []
    for (var i = 0, len = moves.length; i < len; i++) {
      make_move(moves[i])
      if (!king_attacked(us)) {
        legal_moves.push(moves[i])
      }
      undo_move()
    }

    return legal_moves
  }


  function move_to_san(move:any, moves:any) {
    var output = ''

    if (move.flags & BITS.KSIDE_CASTLE) {
      output = 'O-O'
    } else if (move.flags & BITS.QSIDE_CASTLE) {
      output = 'O-O-O'
    } else {
      if (move.piece !== PAWN) {
        var disambiguator = get_disambiguator(move, moves)
        output += move.piece.toUpperCase() + disambiguator
      }

      if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
        if (move.piece === PAWN) {
          output += algebraic(move.from)[0]
        }
        output += 'x'
      }

      output += algebraic(move.to)

      if (move.flags & BITS.PROMOTION) {
        output += '=' + move.promotion.toUpperCase()
      }
    }

    make_move(move)
    if (in_check()) {
      if (in_checkmate()) {
        output += '#'
      } else {
        output += '+'
      }
    }
    undo_move()

    return output
  }

  function stripped_san(move:any) {
    return move.replace(/=/, '').replace(/[+#]?[?!]*$/, '')
  }

  function attacked(color:any, square:any) {
    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {

      if (i & 0x88) {
        i += 7
        continue
      }

      if (board[i] == null || board[i].color !== color) continue

      var piece = board[i]
      var difference = i - square
      var index = difference + 119

      if (ATTACKS[index] & (1 << SHIFTS[piece.type])) {
        if (piece.type === PAWN) {
          if (difference > 0) {
            if (piece.color === WHITE) return true
          } else {
            if (piece.color === BLACK) return true
          }
          continue
        }

    
        if (piece.type === 'n' || piece.type === 'k') return true

        var offset = RAYS[index]
        var j = i + offset

        var blocked = false
        while (j !== square) {
          if (board[j] != null) {
            blocked = true
            break
          }
          j += offset
        }

        if (!blocked) return true
      }
    }

    return false
  }

  function king_attacked(color:any) {
    return attacked(swap_color(color), kings[color])
  }

  function in_check() {
    return king_attacked(turn)
  }

  function in_checkmate() {
    return in_check() && generate_moves({})?.length === 0;
  }
  function in_stalemate() {
    return !in_check() && generate_moves({}).length === 0
  }

  function insufficient_material() {
    var pieces: { [key: string]: any } = {};
    var bishops: any[] = [];
    var num_pieces = 0;
    var sq_color = 0;

    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      sq_color = (sq_color + 1) % 2
      if (i & 0x88) {
        i += 7
        continue
      }

      var piece = board[i]
      if (piece) {
        pieces[piece.type] = piece.type in pieces ? pieces[piece.type] + 1 : 1
        if (piece.type === BISHOP) {
          bishops.push(sq_color)
        }
        num_pieces++
      }
    }


    if (num_pieces === 2) {
      return true
    } else if (

      num_pieces === 3 &&
      (pieces[BISHOP] === 1 || pieces[KNIGHT] === 1)
    ) {
      return true
    } else if (num_pieces === pieces[BISHOP] + 2) {

      var sum = 0
      var len = bishops.length
      for (var i = 0; i < len; i++) {
        sum += bishops[i]
      }
      if (sum === 0 || sum === len) {
        return true
      }
    }

    return false
  }

  function in_threefold_repetition() {
  
    var moves: any[] = [];
var positions: { [key: string]: any } = {};
var repetition: boolean = false;

    while (true) {
      var move = undo_move()
      if (!move) break
      moves.push(move)
    }

    while (true) {
 
      var fen = generate_fen().split(' ').slice(0, 4).join(' ')

   
      positions[fen] = fen in positions ? positions[fen] + 1 : 1
      if (positions[fen] >= 3) {
        repetition = true
      }

      if (!moves.length) {
        break
      }
      make_move(moves.pop())
    }

    return repetition
  }
  interface ChessState {
    move: any;
    kings: any;
    turn: any;
    castling: any;
    ep_square: any;
    half_moves: any;
    move_number: any;
  }
  
  
  
  function push(move: any) {
    history.push({
      move: move,
      kings: { b: kings.b, w: kings.w },
      turn: turn,
      castling: { b: castling.b, w: castling.w },
      ep_square: ep_square,
      half_moves: half_moves,
      move_number: move_number,
    });
  }

  function make_move(move:any) {
    var us = turn
    var them = swap_color(us)
    push(move)

    board[move.to] = board[move.from]
    board[move.from] = null

 
    if (move.flags & BITS.EP_CAPTURE) {
      if (turn === BLACK) {
        board[move.to - 16] = null
      } else {
        board[move.to + 16] = null
      }
    }

   
    if (move.flags & BITS.PROMOTION) {
      board[move.to] = { type: move.promotion, color: us }
    }

  
    if (board[move.to].type === KING) {
      kings[board[move.to].color] = move.to;
    
      var castling_to: number, castling_from: number;
    
      if (move.flags & BITS.KSIDE_CASTLE) {
        castling_to = move.to - 1;
        castling_from = move.to + 1;
        board[castling_to] = board[castling_from];
        board[castling_from] = null;
      } else if (move.flags & BITS.QSIDE_CASTLE) {
        castling_to = move.to + 1;
        castling_from = move.to - 2;
        board[castling_to] = board[castling_from];
        board[castling_from] = null;
      }
    
      castling[us] = 0; 
    }
    if (castling[us]) {
      for (var i = 0, len = ROOKS[us].length; i < len; i++) {
        if (
          move.from === ROOKS[us][i].square &&
          castling[us] & ROOKS[us][i].flag
        ) {
          castling[us] ^= ROOKS[us][i].flag
          break
        }
      }
    }

    if (castling[them as keyof typeof ROOKS]) {
      for (var i = 0, len = ROOKS[them].length; i < len; i++) {
        if (
          move.to === ROOKS[them][i].square &&
          (castling[them] & ROOKS[them][i].flag)
        ) {
          castling[them] ^= ROOKS[them][i].flag;
          break;
        }
      }
    }

 
    if (move.flags & BITS.BIG_PAWN) {
      if (turn === 'b') {
        ep_square = move.to - 16
      } else {
        ep_square = move.to + 16
      }
    } else {
      ep_square = EMPTY
    }

  
    if (move.piece === PAWN) {
      half_moves = 0
    } else if (move.flags & (BITS.CAPTURE | BITS.EP_CAPTURE)) {
      half_moves = 0
    } else {
      half_moves++
    }

    if (turn === BLACK) {
      move_number++
    }
    turn = swap_color(turn)
  }

  function undo_move() {
    var old: ChessState | undefined = history.pop();
    if (old == null) {
        return null;
    }

    var move = old.move;
    kings = old.kings;
    turn = old.turn;
    castling = old.castling;
    ep_square = old.ep_square;
    half_moves = old.half_moves;
    move_number = old.move_number;

    var us = turn;
    var them = swap_color(turn);

    board[move.from] = board[move.to];
    board[move.from].type = move.piece;
    board[move.to] = null;

    if (move.flags & BITS.CAPTURE) {
        board[move.to] = { type: move.captured, color: them };
    } else if (move.flags & BITS.EP_CAPTURE) {
        var index;
        if (us === BLACK) {
            index = move.to - 16;
        } else {
            index = move.to + 16;
        }
        board[index] = { type: PAWN, color: them };
    }

    if (move.flags & (BITS.KSIDE_CASTLE | BITS.QSIDE_CASTLE)) {
        var castling_to, castling_from;
        if (move.flags & BITS.KSIDE_CASTLE) {
            castling_to = move.to + 1;
            castling_from = move.to - 1;
        } else if (move.flags & BITS.QSIDE_CASTLE) {
            castling_to = move.to - 2;
            castling_from = move.to + 1;
        }

        board[castling_to] = board[castling_from];
        board[castling_from] = null;
    }

    return move;
}



  function get_disambiguator(move:any, moves:any) {
    var from = move.from
    var to = move.to
    var piece = move.piece

    var ambiguities = 0
    var same_rank = 0
    var same_file = 0

    for (var i = 0, len = moves.length; i < len; i++) {
      var ambig_from = moves[i].from
      var ambig_to = moves[i].to
      var ambig_piece = moves[i].piece


      if (piece === ambig_piece && from !== ambig_from && to === ambig_to) {
        ambiguities++

        if (rank(from) === rank(ambig_from)) {
          same_rank++
        }

        if (file(from) === file(ambig_from)) {
          same_file++
        }
      }
    }

    if (ambiguities > 0) {
    
      if (same_rank > 0 && same_file > 0) {
        return algebraic(from)
      } else if (same_file > 0) {
        
        return algebraic(from).charAt(1)
      } else {
       
        return algebraic(from).charAt(0)
      }
    }

    return ''
  }

  function infer_piece_type(san:any) {
    var piece_type = san.charAt(0)
    if (piece_type >= 'a' && piece_type <= 'h') {
      var matches = san.match(/[a-h]\d.*[a-h]\d/)
      if (matches) {
        return undefined
      }
      return PAWN
    }
    piece_type = piece_type.toLowerCase()
    if (piece_type === 'o') {
      return KING
    }
    return piece_type
  }
  function ascii() {
    var s = '   +------------------------+\n'
    for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
      /* display the rank */
      if (file(i) === 0) {
        s += ' ' + '87654321'[rank(i)] + ' |'
      }

      /* empty piece */
      if (board[i] == null) {
        s += ' . '
      } else {
        var piece = board[i].type
        var color = board[i].color
        var symbol = color === WHITE ? piece.toUpperCase() : piece.toLowerCase()
        s += ' ' + symbol + ' '
      }

      if ((i + 1) & 0x88) {
        s += '|\n'
        i += 8
      }
    }
    s += '   +------------------------+\n'
    s += '     a  b  c  d  e  f  g  h\n'

    return s
  }


  function move_from_san(move:any, sloppy:any) {

    var clean_move = stripped_san(move)

    var overly_disambiguated = false

    if (sloppy) {
 

      var matches = clean_move.match(
        /([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/
      )
      if (matches) {
        var piece = matches[1]
        var from = matches[2]
        var to = matches[3]
        var promotion = matches[4]

        if (from.length == 1) {
          overly_disambiguated = true
        }
      } else {

        var matches = clean_move.match(
          /([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/
        )

        if (matches) {
          var piece = matches[1]
          var from = matches[2]
          var to = matches[3]
          var promotion = matches[4]

          if (from.length == 1) {
            var overly_disambiguated = true
          }
        }
      }
    }

    var piece_type = infer_piece_type(clean_move)
    var moves = generate_moves({
      legal: true,
      piece: piece ? piece : piece_type,
    })

    for (var i = 0, len = moves.length; i < len; i++) {
     
      if (clean_move === stripped_san(move_to_san(moves[i], moves))) {
        return moves[i]
      } else {
        if (sloppy && matches) {
        
          if (
            (!piece || piece.toLowerCase() == moves[i].piece) &&
            SQUARES[from] == moves[i].from &&
            SQUARES[to] == moves[i].to &&
            (!promotion || promotion.toLowerCase() == moves[i].promotion)
          ) {
            return moves[i]
          } else if (overly_disambiguated) {
    
            var square = algebraic(moves[i].from)
            if (
              (!piece || piece.toLowerCase() == moves[i].piece) &&
              SQUARES[to] == moves[i].to &&
              (from == square[0] || from == square[1]) &&
              (!promotion || promotion.toLowerCase() == moves[i].promotion)
            ) {
              return moves[i]
            }
          }
        }
      }
    }

    return null
  }


  function rank(i:any) {
    return i >> 4
  }

  function file(i:any) {
    return i & 15
  }

  function algebraic(i:any) {
    var f = file(i),
      r = rank(i)
    return 'abcdefgh'.substring(f, f + 1) + '87654321'.substring(r, r + 1)
  }

  function swap_color(c:any) {
    return c === WHITE ? BLACK : WHITE
  }

  function is_digit(c:any) {
    return '0123456789'.indexOf(c) !== -1
  }
  interface Move {
    from: string; // Replace with the actual type
    to: string;   // Replace with the actual type
    san: string;  // Replace with the actual type
    // Other properties if needed
  }
  function make_pretty(ugly_move:any) {
    var move: Move = clone(ugly_move);
    move.san = move_to_san(move, generate_moves({ legal: true }));
    move.to = algebraic(move.to);
    move.from = algebraic(move.from);

    var flags = '';

    for (var flagKey in BITS) {
        var flag = flagKey as keyof typeof BITS;
        if (BITS[flag] & move.flags) {
            flags += FLAGS[flag];
        }
    }

    return move;
}


  function clone<T>(obj: T): T {
    if (obj instanceof Array) {
        return obj.map(item => clone(item)) as T;
    }

    if (typeof obj === 'object') {
        const dupe = {} as T;

        for (const property in obj) {
            if (obj.hasOwnProperty(property)) {
                dupe[property] = clone(obj[property]);
            }
        }

        return dupe;
    }

    return obj;
}


  function trim(str:any) {
    return str.replace(/^\s+|\s+$/g, '')
  }


  function perft(depth:any) {
    var moves = generate_moves({ legal: false })
    var nodes = 0
    var color = turn

    for (var i = 0, len = moves.length; i < len; i++) {
      make_move(moves[i])
      if (!king_attacked(color)) {
        if (depth - 1 > 0) {
          var child_nodes = perft(depth - 1)
          nodes += child_nodes
        } else {
          nodes++
        }
      }
      undo_move()
    }

    return nodes
  }

  return {

    WHITE: WHITE,
    BLACK: BLACK,
    PAWN: PAWN,
    KNIGHT: KNIGHT,
    BISHOP: BISHOP,
    ROOK: ROOK,
    QUEEN: QUEEN,
    KING: KING,
    SQUARES: (function () {
    
      var keys = []
      for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
        if (i & 0x88) {
          i += 7
          continue
        }
        keys.push(algebraic(i))
      }
      return keys
    })(),
    FLAGS: FLAGS,

    load: function(fen: any, keep_headers: any) {
      return load(fen, keep_headers);
    } ,

    reset: function () {
      return reset()
    },

    moves: function (options:any) {
    

      var ugly_moves = generate_moves(options)
      var moves = []

      for (var i = 0, len = ugly_moves.length; i < len; i++) {
      
        if (
          typeof options !== 'undefined' &&
          'verbose' in options &&
          options.verbose
        ) {
          moves.push(make_pretty(ugly_moves[i]))
        } else {
          moves.push(
            move_to_san(ugly_moves[i], generate_moves({ legal: true }))
          )
        }
      }

      return moves
    },

    in_check: function () {
      return in_check()
    },

    in_checkmate: function () {
      return in_checkmate()
    },

    in_stalemate: function () {
      return in_stalemate()
    },

    in_draw: function () {
      return (
        half_moves >= 100 ||
        in_stalemate() ||
        insufficient_material() ||
        in_threefold_repetition()
      )
    },

    insufficient_material: function () {
      return insufficient_material()
    },

    in_threefold_repetition: function () {
      return in_threefold_repetition()
    },

    game_over: function () {
      return (
        half_moves >= 100 ||
        in_checkmate() ||
        in_stalemate() ||
        insufficient_material() ||
        in_threefold_repetition()
      )
    },

    validate_fen: function (fen:any) {
      return validate_fen(fen)
    },

    fen: function () {
      return generate_fen()
    },

    board: function () {
      var output = [],
        row = []

      for (var i = SQUARES.a8; i <= SQUARES.h1; i++) {
        if (board[i] == null) {
          row.push(null)
        } else {
          row.push({ type: board[i].type, color: board[i].color })
        }
        if ((i + 1) & 0x88) {
          output.push(row)
          row = []
          i += 8
        }
      }

      return output
    },

    pgn: function (options:any) {
    
      var newline =
        typeof options === 'object' && typeof options.newline_char === 'string'
          ? options.newline_char
          : '\n'
      var max_width =
        typeof options === 'object' && typeof options.max_width === 'number'
          ? options.max_width
          : 0
          var result: string[] = [];
      var header_exists = false

 
      for (const i in header) {
       
        result.push('[' + i + ' "' + header[i] + '"]' + newline)
        header_exists = true
      }
     

      if (header_exists && history.length) {
        result.push(newline)
      }

      var append_comment = function (move_string:any) {
        var comment = comments[generate_fen()]
        if (typeof comment !== 'undefined') {
          var delimiter = move_string.length > 0 ? ' ' : ''
          move_string = `${move_string}${delimiter}{${comment}}`
        }
        return move_string
      }

      var reversed_history = []
      while (history.length > 0) {
        reversed_history.push(undo_move())
      }

      var moves = []
      var move_string = ''


      if (reversed_history.length === 0) {
        moves.push(append_comment(''))
      }

 
      while (reversed_history.length > 0) {
        move_string = append_comment(move_string)
        var move = reversed_history.pop()

  
        if (!history.length && move.color === 'b') {
          move_string = move_number + '. ...'
        } else if (move.color === 'w') {
         
          if (move_string.length) {
            moves.push(move_string)
          }
          move_string = move_number + '.'
        }

        move_string =
          move_string +
          ' ' +
          move_to_san(move, generate_moves({ legal: true }))
        make_move(move)
      }

    
      if (move_string.length) {
        moves.push(append_comment(move_string))
      }

      if (typeof header.Result !== 'undefined') {
        moves.push(header.Result)
      }

      if (max_width === 0) {
        return result.join('') + moves.join(' ')
      }
    
      var strip = function () {
        if (result.length > 0 && result[result.length - 1] === ' ') {
          result.pop();
          return true;
        }
        return false;
      };
      var wrap_comment = function (width:any, move:any) {
        for (var token of move.split(' ')) {
          if (!token) {
            continue
          }
          if (width + token.length > max_width) {
            while (strip()) {
              width--
            }
            result.push(newline)
            width = 0
          }
          result.push(token)
          width += token.length
          result.push(' ')
          width++
        }
        if (strip()) {
          width--
        }
        return width
      }

      var current_width = 0
      for (var i = 0; i < moves.length; i++) {
        if (current_width + moves[i].length > max_width) {
          if (moves[i].includes('{')) {
            current_width = wrap_comment(current_width, moves[i])
            continue
          }
        }
       
        if (current_width + moves[i].length > max_width && i !== 0) {
      
          if (result[result.length - 1] === ' ') {
            result.pop()
          }

          result.push(newline)
          current_width = 0
        } else if (i !== 0) {
          result.push(' ')
          current_width++
        }
        result.push(moves[i])
        current_width += moves[i].length
      }

      return result.join('')
    },

    load_pgn: function (pgn:any, options:any) {
      
      var sloppy =
        typeof options !== 'undefined' && 'sloppy' in options
          ? options.sloppy
          : false

      function mask(str:any) {
        return str.replace(/\\/g, '\\')
      }

      function has_keys(object:any) {
        for (var key in object) {
          return true
        }
        return false
      }

      function parse_pgn_header(heade:any, options:any) {
        var newline_char =
          typeof options === 'object' &&
          typeof options.newline_char === 'string'
            ? options.newline_char
            : '\r?\n'
            var header_obj = {} as { [key: string]: string }; 
        var headers = header.split(new RegExp(mask(newline_char)))
        var key = ''
        var value = ''

      

        for (var i = 0; i < headers.length; i++) {
          key = headers[i].replace(/^\[([A-Z][A-Za-z]*)\s.*\]$/, '$1')
          value = headers[i].replace(/^\[[A-Za-z]+\s"(.*)"\ *\]$/, '$1')
          if (trim(key).length > 0) {
            header_obj[key] = value
          }
        }

        return header_obj
      }

      var newline_char =
        typeof options === 'object' && typeof options.newline_char === 'string'
          ? options.newline_char
          : '\r?\n'

    
      var header_regex = new RegExp(
        '^(\\[((?:' +
          mask(newline_char) +
          ')|.)*\\])' +
          '(?:' +
          mask(newline_char) +
          '){2}'
      )

     
      var header_match = header_regex.exec(pgn);
var header_string = header_match ? header_match[1] : '';

    
      reset()

   
      var headers = parse_pgn_header(header_string, options)
      for (var key in headers) {
        set_header([key, headers[key]])
      }
      
      
      if (headers['SetUp'] === '1') {
        if (!('FEN' in headers && load(headers['FEN'], true))) {
          return false;
        }
      }


      var to_hex = function (string:any) {
        return Array.from(string)
          .map(function (c:any) {
           
            return c.charCodeAt(0) < 128
              ? c.charCodeAt(0).toString(16)
              : encodeURIComponent(c).replace(/\%/g, '').toLowerCase()
          })
          .join('')
      }

      var from_hex = function (string:any) {
        return string.length == 0
          ? ''
          : decodeURIComponent('%' + string.match(/.{1,2}/g).join('%'))
      }

      var encode_comment = function (string:any) {
        string = string.replace(new RegExp(mask(newline_char), 'g'), ' ')
        return `{${to_hex(string.slice(1, string.length - 1))}}`
      }

      var decode_comment = function (string:any) {
        if (string.startsWith('{') && string.endsWith('}')) {
          return from_hex(string.slice(1, string.length - 1))
        }
      }

     
      var ms = pgn
        .replace(header_string, '')
        .replace(
         
          new RegExp(`(\{[^}]*\})+?|;([^${mask(newline_char)}]*)`, 'g'),
          function (match:any, bracket:any, semicolon:any) {
            return bracket !== undefined
              ? encode_comment(bracket)
              : ' ' + encode_comment(`{${semicolon.slice(1)}}`)
          }
        )
        .replace(new RegExp(mask(newline_char), 'g'), ' ')

     
      var rav_regex = /(\([^\(\)]+\))+?/g
      while (rav_regex.test(ms)) {
        ms = ms.replace(rav_regex, '')
      }

    
      ms = ms.replace(/\d+\.(\.\.)?/g, '')

      ms = ms.replace(/\.\.\./g, '')

      ms = ms.replace(/\$\d+/g, '')

      
      var moves = trim(ms).split(new RegExp(/\s+/))

 
      moves = moves.join(',').replace(/,,+/g, ',').split(',')
      var move = ''

      var result = ''

      for (var half_move = 0; half_move < moves.length; half_move++) {
        var comment = decode_comment(moves[half_move])
        if (comment !== undefined) {
          comments[generate_fen()] = comment
          continue
        }

        move = move_from_san(moves[half_move], sloppy)

        if (move == null) {
          
          if (TERMINATION_MARKERS.indexOf(moves[half_move]) > -1) {
            result = moves[half_move]
          } else {
            return false
          }
        } else {
        
          result = ''
          make_move(move)
        }
      }

      if (result && Object.keys(header).length && !header['Result']) {
        set_header(['Result', result])
      }

      return true
    },

    header: function () {
      return set_header(arguments)
    },

    ascii: function () {
      return ascii()
    },

    turn: function () {
      return turn
    },

    move: function (move:any, options:any) {
  
      var sloppy =
        typeof options !== 'undefined' && 'sloppy' in options
          ? options.sloppy
          : false

      var move_obj = null

      if (typeof move === 'string') {
        move_obj = move_from_san(move, sloppy)
      } else if (typeof move === 'object') {
        var moves = generate_moves({});

      
        for (var i = 0, len = moves.length; i < len; i++) {
          if (
            move.from === algebraic(moves[i].from) &&
            move.to === algebraic(moves[i].to) &&
            (!('promotion' in moves[i]) ||
              move.promotion === moves[i].promotion)
          ) {
            move_obj = moves[i]
            break
          }
        }
      }

     
      if (!move_obj) {
        return null
      }

      var pretty_move = make_pretty(move_obj)

      make_move(move_obj)

      return pretty_move
    },

    undo: function () {
      var move = undo_move()
      return move ? make_pretty(move) : null
    },

    clear: function () {
      return clear(false);
    },

    put: function (piece:any, square:any) {
      return put(piece, square)
    },

    get: function (square:any) {
      return get(square)
    },

    remove: function (square:any) {
      return remove(square)
    },

    perft: function (depth:any) {
      return perft(depth)
    },

    square_color: function (square:any) {
      if (square in SQUARES) {
        var sq_0x88 = SQUARES[square]
        return (rank(sq_0x88) + file(sq_0x88)) % 2 === 0 ? 'light' : 'dark'
      }

      return null
    },

    history: function (options:any) {
      var reversed_history = []
      var move_history = []
      var verbose =
        typeof options !== 'undefined' &&
        'verbose' in options &&
        options.verbose

      while (history.length > 0) {
        reversed_history.push(undo_move())
      }

      while (reversed_history.length > 0) {
        var move = reversed_history.pop()
        if (verbose) {
          move_history.push(make_pretty(move))
        } else {
          move_history.push(move_to_san(move, generate_moves({ legal: true })))
        }
        make_move(move)
      }

      return move_history
    },

    get_comment: function () {
      return comments[generate_fen()]
    },

    set_comment: function (comment:any) {
      comments[generate_fen()] = comment.replace('{', '[').replace('}', ']')
    },

    delete_comment: function () {
      var comment = comments[generate_fen()]
      delete comments[generate_fen()]
      return comment
    },

    get_comments: function () {
      prune_comments()
      return Object.keys(comments).map(function (fen:any) {
        return { fen: fen, comment: comments[fen] }
      })
    },

    delete_comments: function () {
      prune_comments()
      return Object.keys(comments).map(function (fen:any) {
        var comment = comments[fen]
        delete comments[fen]
        return { fen: fen, comment: comment }
      })
    },
  }
}

export default Chess