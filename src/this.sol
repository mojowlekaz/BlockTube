/**
 *  SPDX-License-Identifier: MIT
*/

pragma solidity 0.8.0;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    // ...existing function declarations...

    /**
     * @dev Returns the maximum buy limit for tokens.
     */
    function maxBuyLimit() external view returns (uint256);
}

// ...existing code...

contract Jamsetji is Context, IERC20, IERC20Metadata, Ownable {
    // ...existing code...

    uint256 private _maxBuyLimit;

    /**
     * @dev Sets the values for {name} and {symbol}.
     *
     * The default value of {decimals} is 18. To...
     */
    constructor() {
        _totalSupply = _initSupply;
        _balances[_msgSender()] = _totalSupply;

        // Set the maximum buy limit to a default value
        _maxBuyLimit = 1000 * 10**18; // Example: 1000 tokens

        // ...existing code...
    }

    /**
     * @dev Returns the maximum buy limit for tokens.
     */
    function maxBuyLimit() external view override returns (uint256) {
        return _maxBuyLimit;
    }

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external override returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external override returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(
            sender,
            _msgSender(),
            _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance")
        );
        return true;
    }

    // ...existing code...

    /**
     * @dev Internal function to transfer tokens from one account to another,
     * deducting the balance and applying the buy limit if applicable.
     */
    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) internal {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
        require(amount > 0, "ERC20: transfer amount must be greater than zero");

        if (_isExcludedFromFee[sender] || _isExcludedFromFee[recipient]) {
            // Transfer tokens without buy limit if either sender or recipient is excluded from fees
            _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
            _balances[recipient] = _balances[recipient].add(amount);
        } else {
            // Apply buy limit if sender and recipient are not excluded from fees
            require(amount <= _max